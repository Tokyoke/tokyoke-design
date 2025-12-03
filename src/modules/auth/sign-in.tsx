"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { Lock, User } from "lucide-react"; // Using User icon for CPF

const signInSchema = z.object({
  email: z.string().email({
    message: "Por favor, insira um e-mail válido.",
  }),
  password: z.string().min(1, {
    message: "A senha é obrigatória.",
  }),
});

export default function SignIn() {
  const router = useRouter();
  const signInForm = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSignInSubmit(values: z.infer<typeof signInSchema>) {
    const result = await signIn("credentials", {
      ...values,
      redirect: false,
    });

    if (result?.error) {
      toast.error("E-mail ou senha inválidos.", {
        description: "Por favor, verifique seus dados e tente novamente.",
      });
      return;
    }

    toast.success("Login efetuado com sucesso!");
    router.replace("/"); // Redirect to home page after successful login
  }

  return (
    <TabsContent value="signin" className="mt-6">
      <Card className="border-gray-800 bg-gray-950">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-extrabold tracking-tight text-red-500">
            Bem-vindo(a) de volta!
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...signInForm}>
            <form
              onSubmit={signInForm.handleSubmit(onSignInSubmit)}
              className="space-y-6"
            >
              <FormField
                control={signInForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-400">E-mail</FormLabel>
                    <FormControl>
                      <div className="relative text-gray-400">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" />
                        <Input
                          placeholder="seu@email.com"
                          {...field}
                          className="pl-10"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={signInForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-400">Senha</FormLabel>
                    <FormControl>
                      <div className="relative text-gray-400">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" />
                        <Input
                          type="password"
                          placeholder="••••••••"
                          {...field}
                          className="pl-10"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-lg"
                size="lg"
                disabled={signInForm.formState.isSubmitting}
              >
                {signInForm.formState.isSubmitting ? "Entrando..." : "Entrar"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </TabsContent>
  );
}
