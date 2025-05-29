'use client'

import { useState, useEffect, useRef } from 'react'
import { useSession } from 'next-auth/react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { clientLinks, httpClient } from "@/src/utils"
import { CalendarDate } from "@internationalized/date"
import Image from "next/image"
import { Calendar } from '@nextui-org/react'
import { Camera } from 'lucide-react'
import { ProfileTabSkeleton } from '../ProfileSkeleton'

interface User {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  gender: string;
  birthDate: CalendarDate | null;
  regionId: string;
  cityId: string;
  districtId: string;
  street: string;
  picture: string | File | null;
}

interface Location {
  id: string;
  name: string;
}

interface City extends Location {
  districts: Location[];
}

interface Region extends Location {
  cities: City[];
}

export function ProfileTab() {
  const [isEditing, setIsEditing] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [regions, setRegions] = useState<Region[]>([])
  const [cities, setCities] = useState<City[]>([])
  const [districts, setDistricts] = useState<Location[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchUserData()
  }, [])

  const fetchUserData = async () => {
    try {
      console.log('faetch user data: ')
      setIsLoading(true)
      const [regionsResponse, userResponse] = await Promise.all([
        httpClient.get({ url: clientLinks.user.region }),
        httpClient.get({ url: clientLinks.user.getProfile }),
      ])

      const userData = userResponse.data.data
      console.log('user data: ', {userData})
      setUser({
        ...userData,
        birthDate: userData.birthDate ? new CalendarDate(userData.birthDate.year, userData.birthDate.month, userData.birthDate.day) : null,
      })
      const regiondata = regionsResponse.data.data
      console.log('region response data: ', {regiondata})

      setRegions(regionsResponse.data.data)

      const userRegion = regionsResponse.data.data.find(
        (region: Region) => region.id === userData.regionId
      )

      if (userRegion) {
        setCities(userRegion.cities)
        const userCity = userRegion.cities.find(
          (city: City) => city.id === userData.cityId
        )
        if (userCity) {
          setDistricts(userCity.districts)
        }
      }
    } catch (err) {
      console.error("Error fetching user data:", err)
    }
    finally{
      setIsLoading(false)
    }
  }

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    const formData = new FormData()
    Object.entries(user).forEach(([key, value]) => {
      if (key === 'birthDate' && value instanceof CalendarDate) {
        formData.append('Year', value.year.toString())
        formData.append('Month', value.month.toString())
        formData.append('Day', value.day.toString())
      } else if (key === 'picture' && value instanceof File) {
        formData.append('Picture', value, value.name)
      } else if (value !== null && value !== undefined) {
        formData.append(key, value.toString())
      }
    })

    try {
      await httpClient.put({
        url: clientLinks.user.updateProfile,
        data: formData,
        contentType: "multipart/form-data",
      })
      setIsEditing(false)
      fetchUserData()
    } catch (err) {
      console.error("Error saving user data:", err)
    }
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, files } = e.target as HTMLInputElement
    setUser((prevUser) =>
      prevUser
        ? {
            ...prevUser,
            [name]: files ? files[0] : value,
          }
        : null
    )
  }

  const handleLocationChange = (name: string, value: string) => {
    setUser((prevUser) =>
      prevUser
        ? {
            ...prevUser,
            [name]: value,
          }
        : null
    )

    if (name === 'regionId') {
      const selectedRegion = regions.find(region => region.id === value)
      if (selectedRegion) {
        setCities(selectedRegion.cities)
        setDistricts([])
        setUser(prevUser => prevUser ? {...prevUser, cityId: '', districtId: ''} : null)
      }
    } else if (name === 'cityId') {
      const selectedCity = cities.find(city => city.id === value)
      if (selectedCity) {
        setDistricts(selectedCity.districts)
        setUser(prevUser => prevUser ? {...prevUser, districtId: ''} : null)
      }
    }
  }

  const handleAvatarClick = () => {
    if (isEditing && fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  if (isLoading) return <ProfileTabSkeleton />

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center mb-6">
        <div 
          className="relative w-32 h-32 rounded-full overflow-hidden cursor-pointer"
          onClick={handleAvatarClick}
        >
          {user?.picture && (
            <Image
              src={user.picture instanceof File ? URL.createObjectURL(user.picture) : user.picture}
              layout="fill"
              objectFit="cover"
              alt="Profile"
            />
          )}
          {isEditing && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <Camera className="text-white" size={24} />
            </div>
          )}
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) {
              setUser(prev => prev ? {...prev, picture: file} : null)
            }
          }}
        />
      </div>



      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-white">Name</Label>
                <Input
                  value={user?.name}
                  onChange={(e) => setUser(prev => prev ? {...prev, name: e.target.value} : null)}
                  disabled={!isEditing}
                  className="bg-black/50 border-white/20 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-white">Phone Number</Label>
                <Input
                  value={user?.phoneNumber}
                  onChange={(e) => setUser(prev => prev ? {...prev, phoneNumber: e.target.value} : null)}
                  disabled={!isEditing}
                  className="bg-black/50 border-white/20 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-white">Gender</Label>
                <Select
                  value={user?.gender}
                  onValueChange={(value) => setUser(prev => prev ? {...prev, gender: value} : null)}
                  disabled={!isEditing}
                >
                  <SelectTrigger className="bg-black/50 border-white/20 text-white">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
    
            </div>

            <div className="space-y-2">
              <Label htmlFor="street" className="text-white">Street Address</Label>
              <Input
                id="street"
                name="street"
                value={user?.street}
                onChange={(e) => setUser(prev => prev ? {...prev, street: e.target.value} : null)}
                disabled={!isEditing}
                className="bg-black/50 border-white/20 text-white"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="regionId" className="text-white">Region</Label>
                <Select
                  name="regionId"
                  value={user?.regionId}
                  onValueChange={(value) => handleLocationChange('regionId', value)}
                  disabled={!isEditing}
                >
                  <SelectTrigger className="bg-black/50 border-white/20 text-white">
                    <SelectValue placeholder="Select region" />
                  </SelectTrigger>
                  <SelectContent>
                    {regions.map((region) => (
                      <SelectItem key={region.id} value={region.id}>
                        {region.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="cityId" className="text-white">City</Label>
                <Select
                  name="cityId"
                  value={user?.cityId}
                  onValueChange={(value) => handleLocationChange('cityId', value)}
                  disabled={!isEditing}
                >
                  <SelectTrigger className="bg-black/50 border-white/20 text-white">
                    <SelectValue placeholder="Select city" />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map((city) => (
                      <SelectItem key={city.id} value={city.id}>
                        {city.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="districtId" className="text-white">District</Label>
                <Select
                  name="districtId"
                  value={user?.districtId}
                  onValueChange={(value) => handleLocationChange('districtId', value)}
                  disabled={!isEditing}
                >
                  <SelectTrigger className="bg-black/50 border-white/20 text-white">
                    <SelectValue placeholder="Select district" />
                  </SelectTrigger>
                  <SelectContent>
                    {districts.map((district) => (
                      <SelectItem key={district.id} value={district.id}>
                        {district.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              {!isEditing ? (
                <Button 
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="bg-[#F5A524] text-black hover:bg-[#F5A524]/90"
                >
                  Edit Profile
                </Button>
              ) : (
                <>
                  <Button 
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setIsEditing(false)
                      fetchUserData()
                    }}
                    className="border-white/20 text-white hover:bg-white/10"
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit"
                    className="bg-[#F5A524] text-black hover:bg-[#F5A524]/90"
                  >
                    Save Changes
                  </Button>
                </>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

