'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select } from '@/components/ui/select'
import { apiLinks, httpClient } from '@/src/utils'

interface FormData {
  Name: string;
  Email: string;
  Password: string;
  PhoneNumber: string;
  Gender: string;
  Year: number;
  Month: number;
  Day: number;
  RegionId: string;
  CityId: string;
  DistrictId: string;
  Street: string;
  Picture: File | null;
}

export default function RegisterPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<FormData>({
    Name: '',
    Email: '',
    Password: '',
    PhoneNumber: '',
    Gender: '',
    Year: new Date().getFullYear(),
    Month: new Date().getMonth() + 1,
    Day: new Date().getDate(),
    RegionId: '',
    CityId: '',
    DistrictId: '',
    Street: '',
    Picture: null,
  })
  const [errors, setErrors] = useState<Partial<FormData>>({})

  useEffect(() => {
    if (session?.user) {
      setFormData(prevData => ({
        ...prevData,
        Name: session.user.name || '',
        Email: session.user.email || '',
        Picture: session.user.image ? new File([session.user.image], 'profile.jpg', { type: 'image/jpeg' }) : null,
      }))
    }
  }, [session])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prevData => ({ ...prevData, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prevData => ({ ...prevData, Picture: e.target.files![0] }))
    }
  }

  const validateStep = () => {
    const newErrors: Partial<FormData> = {}
    switch (currentStep) {
      case 0:
        if (!formData.Name) newErrors.Name = 'Name is required'
        if (!formData.Email) newErrors.Email = 'Email is required'
        if (!formData.Password) newErrors.Password = 'Password is required'
        break
      case 1:
        if (!formData.PhoneNumber) newErrors.PhoneNumber = 'Phone number is required'
        if (!formData.Gender) newErrors.Gender = 'Gender is required'
        break
      case 2:
        if (!formData.RegionId) newErrors.RegionId = 'Region is required'
        if (!formData.CityId) newErrors.CityId = 'City is required'
        if (!formData.DistrictId) newErrors.DistrictId = 'District is required'
        if (!formData.Street) newErrors.Street = 'Street is required'
        break
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep()) {
      setCurrentStep(prevStep => prevStep + 1)
    }
  }

  const handlePrevious = () => {
    setCurrentStep(prevStep => prevStep - 1)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (validateStep()) {
      try {
        const formDataToSend = new FormData()
        Object.entries(formData).forEach(([key, value]) => {
          if (value !== null) {
            formDataToSend.append(key, value)
          }
        })
        
        const response = await httpClient.post({
          url: apiLinks.user.register,
          data: formDataToSend,
          headers: { 'Content-Type': 'multipart/form-data' },
        })

        if (response.data.success) {
          router.push('/dashboard')
        } else {
          setErrors({ ...errors, submit: response.data.message })
        }
      } catch (error) {
        console.error('Registration error:', error)
        setErrors({ ...errors, submit: 'An error occurred during registration' })
      }
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <>
            <div>
              <Label htmlFor="Name">Name</Label>
              <Input
                id="Name"
                name="Name"
                value={formData.Name}
                onChange={handleInputChange}
                required
              />
              {errors.Name && <p className="text-red-500">{errors.Name}</p>}
            </div>
            <div>
              <Label htmlFor="Email">Email</Label>
              <Input
                id="Email"
                name="Email"
                type="email"
                value={formData.Email}
                onChange={handleInputChange}
                required
              />
              {errors.Email && <p className="text-red-500">{errors.Email}</p>}
            </div>
            <div>
              <Label htmlFor="Password">Password</Label>
              <Input
                id="Password"
                name="Password"
                type="password"
                value={formData.Password}
                onChange={handleInputChange}
                required
              />
              {errors.Password && <p className="text-red-500">{errors.Password}</p>}
            </div>
          </>
        )
      case 1:
        return (
          <>
            <div>
              <Label htmlFor="PhoneNumber">Phone Number</Label>
              <Input
                id="PhoneNumber"
                name="PhoneNumber"
                value={formData.PhoneNumber}
                onChange={handleInputChange}
                required
              />
              {errors.PhoneNumber && <p className="text-red-500">{errors.PhoneNumber}</p>}
            </div>
            <div>
              <Label htmlFor="Gender">Gender</Label>
              <Select
                id="Gender"
                name="Gender"
                value={formData.Gender}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </Select>
              {errors.Gender && <p className="text-red-500">{errors.Gender}</p>}
            </div>
            <div>
              <Label htmlFor="birthdate">Date of Birth</Label>
              <div className="flex gap-2">
                <Input
                  id="Year"
                  name="Year"
                  type="number"
                  value={formData.Year}
                  onChange={handleInputChange}
                  placeholder="Year"
                  required
                />
                <Input
                  id="Month"
                  name="Month"
                  type="number"
                  value={formData.Month}
                  onChange={handleInputChange}
                  placeholder="Month"
                  min="1"
                  max="12"
                  required
                />
                <Input
                  id="Day"
                  name="Day"
                  type="number"
                  value={formData.Day}
                  onChange={handleInputChange}
                  placeholder="Day"
                  min="1"
                  max="31"
                  required
                />
              </div>
            </div>
          </>
        )
      case 2:
        return (
          <>
            <div>
              <Label htmlFor="RegionId">Region</Label>
              <Select
                id="RegionId"
                name="RegionId"
                value={formData.RegionId}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Region</option>
                {/* Add region options here */}
              </Select>
              {errors.RegionId && <p className="text-red-500">{errors.RegionId}</p>}
            </div>
            <div>
              <Label htmlFor="CityId">City</Label>
              <Select
                id="CityId"
                name="CityId"
                value={formData.CityId}
                onChange={handleInputChange}
                required
              >
                <option value="">Select City</option>
                {/* Add city options here */}
              </Select>
              {errors.CityId && <p className="text-red-500">{errors.CityId}</p>}
            </div>
            <div>
              <Label htmlFor="DistrictId">District</Label>
              <Select
                id="DistrictId"
                name="DistrictId"
                value={formData.DistrictId}
                onChange={handleInputChange}
                required
              >
                <option value="">Select District</option>
                {/* Add district options here */}
              </Select>
              {errors.DistrictId && <p className="text-red-500">{errors.DistrictId}</p>}
            </div>
            <div>
              <Label htmlFor="Street">Street</Label>
              <Input
                id="Street"
                name="Street"
                value={formData.Street}
                onChange={handleInputChange}
                required
              />
              {errors.Street && <p className="text-red-500">{errors.Street}</p>}
            </div>
          </>
        )
      case 3:
        return (
          <div>
            <Label htmlFor="Picture">Profile Picture</Label>
            <Input
              id="Picture"
              name="Picture"
              type="file"
              onChange={handleFileChange}
              accept="image/*"
            />
            {formData.Picture && (
              <img
                src={URL.createObjectURL(formData.Picture)}
                alt="Profile Preview"
                className="mt-2 w-32 h-32 object-cover rounded-full"
              />
            )}
          </div>
        )
      default:
        return null
    }
  }

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {renderStep()}
          <div className="flex justify-between mt-6">
            {currentStep > 0 && (
              <Button type="button" onClick={handlePrevious}>
                Previous
              </Button>
            )}
            {currentStep < 3 ? (
              <Button type="button" onClick={handleNext}>
                Next
              </Button>
            ) : (
              <Button type="submit">Submit</Button>
            )}
          </div>
        </form>
        {errors.submit && <p className="text-red-500 mt-4">{errors.submit}</p>}
      </div>
    </div>
  )
}
