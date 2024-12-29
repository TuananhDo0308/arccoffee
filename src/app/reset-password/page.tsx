'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { clientLinks, httpClient } from '@/src/utils'
import { showPopup } from '@/src/slices/message'
import { useAppDispatch } from '@/src/hooks/hook'
import { Card, CardBody, CardHeader, Input, Button } from "@nextui-org/react"
import { EyeIcon, EyeOffIcon } from 'lucide-react'

export default function ResetPassword() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isConfirmVisible, setIsConfirmVisible] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const dispatch = useAppDispatch()

  const token = searchParams.get('token')
  const email = searchParams.get('email')

  const toggleVisibility = () => setIsVisible(!isVisible)
  const toggleConfirmVisibility = () => setIsConfirmVisible(!isConfirmVisible)

  const validatePassword = (password: string) => {
    if (password.length < 8) {
      return "Password must be at least 8 characters long"
    }
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const passwordError = validatePassword(password)
    if (passwordError) {
      setError(passwordError)
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    try {
      const response = await httpClient.put({
        url: clientLinks.email.updatePassword,
        data: { token, email, password }
      })

      if (response.status === 200) {
        dispatch(
          showPopup({
            message: "Password updated successfully",
            type: "success",
          })
        )
        setSuccess(true)
        setTimeout(() => router.push('/'), 3000)
      } else {
        const data = await response.json()
        setError(data.message || 'An error occurred')
      }
    } catch (error) {
      setError('An error occurred. Please try again.')
    }
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <Card className="w-[400px] bg-black/60 border-none">
          <CardBody className="text-center">
            <h2 className="text-2xl font-bold text-white mb-2">Password Reset Successfully</h2>
            <p className="text-default-500">Redirecting to homepage...</p>
          </CardBody>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      <Card className="w-[400px] bg-black/60 border-none">
        <CardHeader className="flex flex-col gap-2 items-center">
          <h2 className="text-2xl font-bold text-white">Reset your password</h2>
          <p className="text-default-500 text-center text-sm">
            Please enter your new password
          </p>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              label="New Password"
              variant="bordered"
              placeholder="Enter your new password"
              endContent={
                <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                  {isVisible ? (
                    <EyeIcon className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <EyeOffIcon className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
              type={isVisible ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              classNames={{
                label: "text-white/90",
                input: "text-white/90",
              }}
            />

            <Input
              label="Confirm Password"
              variant="bordered"
              placeholder="Confirm your new password"
              endContent={
                <button className="focus:outline-none" type="button" onClick={toggleConfirmVisibility}>
                  {isConfirmVisible ? (
                    <EyeIcon className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <EyeOffIcon className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
              type={isConfirmVisible ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              classNames={{
                label: "text-white/90",
                input: "text-white/90",
              }}
            />

            {error && (
              <p className="text-danger text-sm text-center">{error}</p>
            )}

            <Button
              type="submit"
              color="warning"
              className="w-full font-semibold"
              size="lg"
            >
              Reset Password
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  )
}

