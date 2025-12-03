"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";

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
import { useSignUp } from "@/hooks/react-query/cadastros/use-sign-up";
import { BadgeInfo, Lock, Mail, Phone, User } from "lucide-react";

const signUpSchema = z.object({
  name: z.string().min(3, {
    message: "O nome precisa ter pelo menos 3 caracteres.",
  }),
  phone: z.string().min(10, {
    message: "Por favor, insira um telefone válido com DDD.",
  }),
  cpf: z.string().regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$|^\d{11}$/, {
    message: "Por favor, insira um CPF válido.",
  }),
  email: z.string().email({
    message: "Por favor, insira um e-mail válido.",
  }),
  password: z.string().min(8, {
    message: "A senha deve ter no mínimo 8 caracteres.",
  }),
});

export default function SignUp() {
  const { mutate: signUp, isPending } = useSignUp();
  const signUpForm = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      phone: "",
      cpf: "",
      email: "",
      password: "",
    },
  });

  function onSignUpSubmit(values: z.infer<typeof signUpSchema>) {
    signUp(
      {
        nome: values.name,
        telefone: parseInt(values.phone.replace(/\D/g, ""), 10),
        cpf: values.cpf.replace(/\D/g, ""),
        email: values.email,
        senha: values.password,
        role: "USER",
      },
      {
        onSuccess: () => {
          signUpForm.reset();
          toast.success("Conta criada com sucesso! Faça login para continuar.");
        },
      }
    );
  }
  return (
    <TabsContent value="signup" className="mt-6">
      <Card className="border-gray-800 bg-gray-950">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-extrabold tracking-tight text-red-500">
            Crie sua Conta
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...signUpForm}>
            <form
              onSubmit={signUpForm.handleSubmit(onSignUpSubmit)}
              className="space-y-6"
            >
              <FormField
                control={signUpForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-400">
                      Nome Completo
                    </FormLabel>
                    <FormControl>
                      <div className="relative text-gray-400">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" />
                        <Input
                          placeholder="Seu nome"
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
                control={signUpForm.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-400">
                      Telefone / WhatsApp
                    </FormLabel>
                    <FormControl>
                      <div className="relative text-gray-400">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" />
                        <Input
                          placeholder="(11) 99999-9999"
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
                control={signUpForm.control}
                name="cpf"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-400">CPF</FormLabel>
                    <FormControl>
                      <div className="relative text-gray-400">
                        <BadgeInfo className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" />
                        <Input
                          placeholder="000.000.000-00"
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
                control={signUpForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-400">E-mail</FormLabel>
                    <FormControl>
                      <div className="relative text-gray-400">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" />
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
                control={signUpForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-400">
                      Crie uma Senha
                    </FormLabel>
                    <FormControl>
                      <div className="relative text-gray-400">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" />
                        <Input
                          type="password"
                          placeholder="Mínimo 8 caracteres"
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
                disabled={isPending}
              >
                {isPending ? "Criando..." : "Criar Conta"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </TabsContent>
  );
}
