"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, ArrowRight, Users, Calendar, BookOpen, Code, UserPlus } from "lucide-react"

const joinFormSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  studentId: z.string().optional(),
  studyProgram: z.string().min(1, "Please select your study program"),
  yearOfStudy: z.string().min(1, "Please select your year of study"),
  interests: z.array(z.string()).min(1, "Please select at least one interest"),
  experience: z.string().min(1, "Please select your experience level"),
  motivation: z.string().min(50, "Please provide a motivation (at least 50 characters)"),
  howDidYouHear: z.string().min(1, "Please select how you heard about us"),
  additionalInfo: z.string().optional(),
})

type JoinFormValues = z.infer<typeof joinFormSchema>

const studyPrograms = [
  "Computer Science",
  "Data Science",
  "Mathematics",
  "Physics",
  "Electrical Engineering",
  "Mechanical Engineering",
  "Chemical Engineering",
  "Life Sciences",
  "Architecture",
  "Civil Engineering",
  "Materials Science",
  "Environmental Engineering",
  "Other",
]

const yearsOfStudy = [
  "1st Year Bachelor",
  "2nd Year Bachelor", 
  "3rd Year Bachelor",
  "1st Year Master",
  "2nd Year Master",
  "PhD",
  "Other",
]

const interests = [
  "Blockchain Development",
  "DeFi (Decentralized Finance)",
  "NFTs and Digital Art",
  "Smart Contracts",
  "Cryptocurrency Trading",
  "Web3 Infrastructure",
  "DAOs and Governance",
  "Layer 2 Solutions",
  "Cross-chain Technology",
  "Blockchain Security",
  "Research and Academia",
  "Entrepreneurship",
  "Investment and Finance",
  "Regulation and Policy",
  "Sustainability",
  "Other",
]

const experienceLevels = [
  "Beginner - No prior blockchain experience",
  "Some Knowledge - Basic understanding of blockchain concepts",
  "Intermediate - Have worked with blockchain technologies",
  "Advanced - Experienced developer or researcher",
  "Expert - Professional experience in the field",
]

const howDidYouHear = [
  "EPFL Website",
  "Social Media (LinkedIn, Twitter, etc.)",
  "Friend or Classmate",
  "Faculty Member",
  "BSA Event",
  "University Fair",
  "Online Search",
  "Other",
]

export default function JoinPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const form = useForm<JoinFormValues>({
    resolver: zodResolver(joinFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      studentId: "",
      studyProgram: "",
      yearOfStudy: "",
      interests: [],
      experience: "",
      motivation: "",
      howDidYouHear: "",
      additionalInfo: "",
    },
  })

  async function onSubmit(data: JoinFormValues) {
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/join', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to submit application')
      }

      const result = await response.json()
      console.log("Form submitted successfully:", result)
      
      setIsSubmitted(true)
    } catch (error) {
      console.error("Error submitting form:", error)
      // You could add error handling here, like showing a toast notification
      alert('Failed to submit application. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a] text-white">
        <div className="container mx-auto px-4 md:px-6 py-24">
          <div className="max-w-2xl mx-auto text-center">
            <div className="glass rounded-2xl p-12 border border-[#6366f1]/20">
              <div className="mb-8">
                <CheckCircle className="w-20 h-20 text-green-400 mx-auto mb-4" />
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Welcome to BSA!</h1>
                <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                  Thank you for your interest in joining the Blockchain Student Association. 
                  We've received your application and will be in touch soon!
                </p>
              </div>
              
              <div className="glass rounded-2xl p-8 mb-8 border border-[#6366f1]/20">
                <h2 className="text-2xl font-semibold mb-4 text-white">What's Next?</h2>
                <div className="space-y-4 text-left">
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-[#6366f1] mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-white">Welcome Email</h3>
                      <p className="text-gray-300">You'll receive a welcome email within 24 hours</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Users className="w-5 h-5 text-[#6366f1] mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-white">Community Access</h3>
                      <p className="text-gray-300">Get access to our Discord server and event notifications</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <BookOpen className="w-5 h-5 text-[#6366f1] mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-white">Upcoming Events</h3>
                      <p className="text-gray-300">Stay tuned for our next workshops and meetups</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild className="bg-gradient-to-r from-[#6366f1] to-[#7c3aed] hover:from-[#7c3aed] hover:to-[#ec4899] text-white border-0 hover-lift">
                  <a href="/events">View Upcoming Events</a>
                </Button>
                <Button asChild variant="outline" className="border-[#6366f1] text-[#6366f1] hover:bg-[#6366f1] hover:text-white hover-lift">
                  <a href="/">Back to Home</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a] text-white">
      {/* Hero Section */}
      <section className="py-24 md:py-32 bg-gradient-to-b from-[#0a0a0a]/50 to-transparent">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#6366f1]/10 border border-[#6366f1]/20 rounded-full text-sm text-[#6366f1] mb-6">
              <UserPlus size={16} />
              <span>Join Us</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              Join the BSA
              <span className="gradient-text block">Community</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              Become part of EPFL's premier blockchain community. Connect, learn, and build the future with us.
            </p>
            
            {/* Benefits Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="glass rounded-2xl p-6 border border-[#6366f1]/20 hover-lift">
                <Code className="w-8 h-8 text-[#6366f1] mx-auto mb-3" />
                <h3 className="text-lg font-semibold mb-2 text-white">Hands-on Learning</h3>
                <p className="text-gray-300">Access to workshops, hackathons, and real-world projects</p>
              </div>
              <div className="glass rounded-2xl p-6 border border-[#6366f1]/20 hover-lift">
                <Users className="w-8 h-8 text-[#6366f1] mx-auto mb-3" />
                <h3 className="text-lg font-semibold mb-2 text-white">Network & Connect</h3>
                <p className="text-gray-300">Meet industry professionals and like-minded students</p>
              </div>
              <div className="glass rounded-2xl p-6 border border-[#6366f1]/20 hover-lift">
                <BookOpen className="w-8 h-8 text-[#6366f1] mx-auto mb-3" />
                <h3 className="text-lg font-semibold mb-2 text-white">Stay Updated</h3>
                <p className="text-gray-300">Get the latest insights and opportunities in blockchain</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-24 bg-gradient-to-b from-transparent to-[#0a0a0a]/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <Card className="glass border-[#6366f1]/20">
              <CardHeader>
                <CardTitle className="text-2xl text-white">Application Form</CardTitle>
                <CardDescription className="text-gray-300">
                  Tell us about yourself and your interest in blockchain technology
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {/* Personal Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">First Name *</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Enter your first name" 
                                {...field} 
                                className="bg-[#1a1a1a] border-[#6366f1]/20 text-white placeholder-gray-400 focus:border-[#6366f1]"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Last Name *</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Enter your last name" 
                                {...field} 
                                className="bg-[#1a1a1a] border-[#6366f1]/20 text-white placeholder-gray-400 focus:border-[#6366f1]"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Email Address *</FormLabel>
                          <FormControl>
                            <Input 
                              type="email" 
                              placeholder="your.email@epfl.ch" 
                              {...field} 
                              className="bg-[#1a1a1a] border-[#6366f1]/20 text-white placeholder-gray-400 focus:border-[#6366f1]"
                            />
                          </FormControl>
                          <FormDescription className="text-gray-300">
                            We'll use this to send you updates and event notifications
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="studentId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Student ID (Optional)</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="e.g., 123456" 
                              {...field} 
                              className="bg-[#1a1a1a] border-[#6366f1]/20 text-white placeholder-gray-400 focus:border-[#6366f1]"
                            />
                          </FormControl>
                          <FormDescription className="text-gray-300">
                            Help us verify your EPFL student status
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Academic Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="studyProgram"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Study Program *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="bg-[#1a1a1a] border-[#6366f1]/20 text-white focus:border-[#6366f1]">
                                  <SelectValue placeholder="Select your program" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="bg-[#1a1a1a] border-[#6366f1]/20">
                                {studyPrograms.map((program) => (
                                  <SelectItem key={program} value={program}>
                                    {program}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="yearOfStudy"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Year of Study *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="bg-[#1a1a1a] border-[#6366f1]/20 text-white focus:border-[#6366f1]">
                                  <SelectValue placeholder="Select your year" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="bg-[#1a1a1a] border-[#6366f1]/20">
                                {yearsOfStudy.map((year) => (
                                  <SelectItem key={year} value={year}>
                                    {year}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Interests */}
                    <FormField
                      control={form.control}
                      name="interests"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Areas of Interest *</FormLabel>
                          <FormDescription className="text-gray-300">
                            Select all that apply (you can select multiple)
                          </FormDescription>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {interests.map((interest) => (
                              <label key={interest} className="flex items-center space-x-2 cursor-pointer">
                                <input
                                  type="checkbox"
                                  value={interest}
                                  checked={field.value?.includes(interest)}
                                  onChange={(e) => {
                                    const value = e.target.value
                                    const currentValues = field.value || []
                                    if (e.target.checked) {
                                      field.onChange([...currentValues, value])
                                    } else {
                                      field.onChange(currentValues.filter((v) => v !== value))
                                    }
                                  }}
                                  className="rounded border-[#6366f1]/20 text-[#6366f1] focus:ring-[#6366f1] bg-[#1a1a1a]"
                                />
                                <span className="text-sm text-gray-300">{interest}</span>
                              </label>
                            ))}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Experience Level */}
                    <FormField
                      control={form.control}
                      name="experience"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Blockchain Experience *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-[#1a1a1a] border-[#6366f1]/20 text-white focus:border-[#6366f1]">
                                <SelectValue placeholder="Select your experience level" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-[#1a1a1a] border-[#6366f1]/20">
                              {experienceLevels.map((level) => (
                                <SelectItem key={level} value={level}>
                                  {level}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormDescription className="text-gray-300">
                            Don't worry if you're a beginner - we welcome all experience levels!
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Motivation */}
                    <FormField
                      control={form.control}
                      name="motivation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Why do you want to join BSA? *</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tell us about your interest in blockchain and what you hope to gain from joining BSA..."
                              className="min-h-[120px] bg-[#1a1a1a] border-[#6366f1]/20 text-white placeholder-gray-400 focus:border-[#6366f1]"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription className="text-gray-300">
                            Share your motivation and goals (minimum 50 characters)
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* How did you hear about us */}
                    <FormField
                      control={form.control}
                      name="howDidYouHear"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">How did you hear about BSA? *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-[#1a1a1a] border-[#6366f1]/20 text-white focus:border-[#6366f1]">
                                <SelectValue placeholder="Select an option" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-[#1a1a1a] border-[#6366f1]/20">
                              {howDidYouHear.map((option) => (
                                <SelectItem key={option} value={option}>
                                  {option}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Additional Information */}
                    <FormField
                      control={form.control}
                      name="additionalInfo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Additional Information (Optional)</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Any additional information you'd like to share..."
                              className="min-h-[100px] bg-[#1a1a1a] border-[#6366f1]/20 text-white placeholder-gray-400 focus:border-[#6366f1]"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription className="text-gray-300">
                            Projects, skills, or anything else you'd like us to know
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Submit Button */}
                    <div className="pt-6">
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-[#6366f1] to-[#7c3aed] hover:from-[#7c3aed] hover:to-[#ec4899] text-white border-0 hover-lift font-semibold py-3"
                      >
                        {isSubmitting ? (
                          "Submitting..."
                        ) : (
                          <>
                            Submit Application
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
} 