'use client'

import { useEffect, useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, ArrowLeft, Loader2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import LogoIcon from '@/components/icons/logo'
import { z } from "zod";
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { InsertUserSchema, InsertUserSchemaType } from '@/schema/users'
import { RegisterUser } from '../../_actions/registerUser'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

export const loginSchema = z.object({
    username: z.string().min(1, "Username is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;

type TabsValue = 'login' | 'register'

export default function AuthForm() {
    const queryClient = useQueryClient();
    const [errorLogin, setErrorLogin] = useState<string | null>(null)
    const [errorRegister, setErrorRegister] = useState<string | null>(null)
    const router = useRouter()
    const searchParams = useSearchParams()
    const [tabsValue, setTabsValue] = useState<TabsValue>('login')

    const formLogin = useForm<LoginSchemaType>({
        resolver: zodResolver(loginSchema),
    });

    const formRegister = useForm<InsertUserSchemaType>({
        resolver: zodResolver(InsertUserSchema),
        defaultValues: {
            username: "",
            password: "",
            name: "",
            role: "user",
        }
    });

    const [isPendingLogin, setIsPendingLogin] = useState(false)
    const { mutate, isPending: isPendingRegister } = useMutation({
        mutationFn: RegisterUser,
        onSuccess: async (data: InsertUserSchemaType) => {
            formRegister.reset({
                username: "",
                password: "",
                name: "",
                role: "user",
            });

            toast.success(`User ${data.username} registered successfully, Sign in to continue`, {
                id: "register-user",
            });

            setTabsValue('login')

            await queryClient.invalidateQueries({
                queryKey: ["users"],
            });

        },
        onError: (e) => {
            console.log(e);

            setErrorRegister(e.message)
            toast.error("Something went wrong", {
                id: "register-user",
            });
        },
    });

    useEffect(() => {
        if (searchParams.get('signup') === 'true') {
            setTabsValue('register')
        }
    }, [searchParams])


    const handleLogin = async (values: LoginSchemaType) => {
        setIsPendingLogin(true)

        try {
            const result = await signIn('credentials', {
                ...values,
                redirect: false,
            })
            
            setIsPendingLogin(false)

            if (!result || result?.error) {
                setErrorLogin('Invalid credentials')
                return;
            }

            if(searchParams.get('callbackUrl')) {
                router.push(searchParams.get('callbackUrl')!)
                return;
            }

            router.refresh()
            //     console.log(session);

            //     if(session?.user.role === "admin") {
            //         router.push("/admin")
            //     } else {
            //         router.push("/")
            //     }
            // }
        } catch (error) {
            setErrorLogin('An error occurred during login')
        }
    }

    const handleRegister = async (values: InsertUserSchemaType) => {
        toast.loading("Registering user...", {
            id: "register-user",
        });
        mutate(values);
    }

    return (
        <>
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle className='flex items-center gap-3 text-xl justify-center'>
                        <LogoIcon className="h-24 w-24 text-primary" /> <span className='sr-only'>Ecosystem BMW</span>
                    </CardTitle>
                    <CardDescription>Login or create a new account</CardDescription>
                </CardHeader>
                <CardContent>
                    <Tabs value={tabsValue} onValueChange={(v) => setTabsValue(v as TabsValue)} defaultValue="login" >
                        <TabsList className="grid w-full grid-cols-2 bg-gray-200 dark:bg-gray-800 mb-4">
                            <TabsTrigger value="login">Login</TabsTrigger>
                            <TabsTrigger value="register">Register</TabsTrigger>
                        </TabsList>
                        <TabsContent value="login">
                            <Form {...formLogin}>
                                <form onSubmit={formLogin.handleSubmit(handleLogin)} className="space-y-4">

                                    <FormField
                                        control={formLogin.control}
                                        name="username"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Username</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Username" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={formLogin.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Password</FormLabel>
                                                <FormControl>
                                                    <Input autoComplete='current-password' type="password" placeholder="******" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    {errorLogin && (
                                        <Alert variant="destructive">
                                            <AlertCircle className="h-4 w-4" />
                                            <AlertTitle>Error</AlertTitle>
                                            <AlertDescription>{errorLogin}</AlertDescription>
                                        </Alert>
                                    )}
                                    <Button type="submit" className="w-full" disabled={isPendingLogin}>
                                        {(isPendingLogin) ? <>
                                            <Loader2 className="animate-spin w-5 h-5 mr-2" />
                                            Logging in...
                                        </> : 'Login'}
                                    </Button>
                                </form>
                            </Form>
                        </TabsContent>
                        <TabsContent value="register">
                            <Form {...formRegister}>
                                <form onSubmit={formRegister.handleSubmit(handleRegister)} className="space-y-4">
                                    <FormField
                                        control={formRegister.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Name" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={formRegister.control}
                                        name="username"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Username</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Username" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={formRegister.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Password</FormLabel>
                                                <FormControl>
                                                    <Input autoComplete='current-password' type="password" placeholder="******" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    {errorRegister && (
                                        <Alert variant="destructive">
                                            <AlertCircle className="h-4 w-4" />
                                            <AlertTitle>Error</AlertTitle>
                                            <AlertDescription>{errorRegister}</AlertDescription>
                                        </Alert>
                                    )}
                                    <Button type="submit" className="w-full" disabled={isPendingRegister}>
                                        {(isPendingRegister) ? <>
                                            <Loader2 className="animate-spin w-5 h-5 mr-2" />
                                            Registering...
                                        </> : 'Register'}
                                    </Button>
                                </form>
                            </Form>
                        </TabsContent>
                    </Tabs>
                </CardContent>
                <CardFooter>
                </CardFooter>
            </Card>
            <Button
                variant="ghost"
                size="sm"
                className='mt-2'
                onClick={() => router.back()}
                aria-label="Go back"
            >
                <ArrowLeft className="h-4 w-4 mr-3" /> Take me back
            </Button>
        </>
    )
}