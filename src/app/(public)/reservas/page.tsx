"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

import { CalendarIcon, Clock, Mail, Phone, User, Users } from "lucide-react";
import { toast } from "sonner";

const reservationFormSchema = z.object({
  name: z.string().min(3, {
    message: "O nome precisa ter pelo menos 3 caracteres.",
  }),
  cpf: z.string().regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$|^\d{11}$/, {
    message: "Por favor, insira um CPF válido.",
  }),
  phone: z.string().min(10, {
    message: "Por favor, insira um telefone válido com DDD.",
  }),
  date: z.date({
    error: "Por favor, selecione uma data válida.",
  }),
  time: z.string({
    error: "Por favor, selecione um horário válido.",
  }),
  guests: z.string({
    error: "Por favor, informe o número de convidados.",
  }),
});

export default function ReservasPage() {
  const form = useForm<z.infer<typeof reservationFormSchema>>({
    resolver: zodResolver(reservationFormSchema),
    defaultValues: {
      name: "",
      cpf: "",
      phone: "",
    },
  });

  function onSubmit(values: z.infer<typeof reservationFormSchema>) {
    console.log("Dados da Reserva:", values);
    toast("Reserva Enviada!", {
      description: `Obrigado, ${values.name}. Entraremos em contato em breve para confirmar.`,
      className: "bg-gray-800 text-white border-red-500",
    });
    form.reset();
  }

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <main className="grow py-12 md:py-20">
        <div className="container mx-auto max-w-3xl px-4 md:px-6">
          <Card className="border-gray-800 bg-gray-950">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-extrabold tracking-tight text-red-500 sm:text-4xl">
                Faça sua Reserva
              </CardTitle>
              <p className="text-gray-400">
                Garanta sua sala privativa e prepare-se para soltar a voz!
              </p>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-red-400">
                      1. Detalhes da Reserva
                    </h3>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>Data</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant={"outline"}
                                    className={cn(
                                      "w-full justify-start text-left font-normal",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {field.value ? (
                                      format(field.value, "PPP", {
                                        locale: ptBR,
                                      })
                                    ) : (
                                      <span>Escolha uma data</span>
                                    )}
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent
                                className="w-auto p-0"
                                align="start"
                              >
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={(date) => date < new Date()}
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="time"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Horário</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="text-gray-400">
                                  <Clock className="mr-2 h-4 w-4" />
                                  <SelectValue placeholder="Selecione um horário" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="18:00">18:00</SelectItem>
                                <SelectItem value="19:00">19:00</SelectItem>
                                <SelectItem value="20:00">20:00</SelectItem>
                                <SelectItem value="21:00">21:00</SelectItem>
                                <SelectItem value="22:00">22:00</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="guests"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Número de Pessoas</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="text-gray-400">
                                <Users className="mr-2 h-4 w-4" />
                                <SelectValue placeholder="Quantas pessoas?" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="2-4">
                                Até 4 pessoas (Sala P)
                              </SelectItem>
                              <SelectItem value="5-8">
                                5-8 pessoas (Sala M)
                              </SelectItem>
                              <SelectItem value="9-15">
                                9-15 pessoas (Sala G)
                              </SelectItem>
                              <SelectItem value="16+">
                                16+ pessoas (Eventos)
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-red-400">
                      2. Seus Dados
                    </h3>

                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-400">
                            Nome Completo
                          </FormLabel>
                          <FormControl>
                            <div className="relative text-gray-400">
                              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
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
                      control={form.control}
                      name="cpf"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-400">CPF</FormLabel>
                          <FormControl>
                            <div className="relative text-gray-400">
                              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
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
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-400">
                            Telefone / WhatsApp
                          </FormLabel>
                          <FormControl>
                            <div className="relative text-gray-400">
                              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                              <Input
                                placeholder="(11) 99999-9999"
                                {...field}
                                className="pl-10"
                              />
                            </div>
                          </FormControl>
                          <FormDescription className="text-xs text-gray-500">
                            Usaremos este número para confirmar sua reserva.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-red-600 hover:bg-red-700 text-lg"
                    size="lg"
                  >
                    Confirmar Pré-Reserva
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
