"use client";

import { CreateReserva } from "@/_types/reserva";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateReserva } from "@/hooks/react-query/reservas/use-create-reserva";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  cpf: z
    .string()
    .min(11, "CPF deve ter 11 caracteres")
    .max(11, "CPF deve ter 11 caracteres"),
  data: z.string().min(1, "Data é obrigatória"),
  guests: z.coerce.number().min(1, "Pelo menos uma pessoa"),
  status: z.enum(["PENDENTE", "APROVADO", "REPROVADO"]),
});

export function CreateReservationForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema as any),
    defaultValues: {
      cpf: "",
      data: "",
      guests: 1,
      status: "PENDENTE",
    },
  });

  const { mutate: createReserva, isPending } = useCreateReserva();

  function onSubmit(values: z.infer<typeof formSchema>) {
    const [date, time] = values.data.split("T");

    const payload: CreateReserva = {
      cpf: values.cpf.replace(/\D/g, ""), // Remove non-digit characters
      date,
      time,
      guests: values.guests,
    };

    createReserva(payload, {
      onSuccess: () => {
        form.reset();
      },
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="cpf"
          render={({ field }) => (
            <FormItem>
              <FormLabel>CPF</FormLabel>
              <FormControl>
                <Input placeholder="___.___.___-__" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="data"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Data e Hora</FormLabel>
              <FormControl>
                <Input type="datetime-local" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="guests"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantidade de Pessoas</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="PENDENTE">Pendente</SelectItem>
                  <SelectItem value="APROVADO">Aprovado</SelectItem>
                  <SelectItem value="REPROVADO">Reprovado</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending}>
          {isPending ? "Criando..." : "Criar Reserva"}
        </Button>
      </form>
    </Form>
  );
}
