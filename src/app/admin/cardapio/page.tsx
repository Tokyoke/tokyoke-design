"use client";

import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Cake,
  Martini,
  Pencil,
  PlusCircle,
  Trash2,
  Utensils,
} from "lucide-react";

const menuItemSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres."),
  description: z
    .string()
    .min(5, "A descrição deve ter pelo menos 5 caracteres."),
  price: z.number().min(0, "O preço deve ser um valor positivo."),
  category: z.enum(["petiscos", "bebidas", "sobremesas"]),
});

type MenuItemFormValues = z.infer<typeof menuItemSchema>;

const mockMenuItems: MenuItemFormValues[] = [
  {
    id: "1",
    name: "Batata Frita Tokyokê",
    description: "Porção com cheddar e bacon.",
    price: 42,
    category: "petiscos",
  },
  {
    id: "2",
    name: "Frango a Passarinho",
    description: "Cortes de frango fritos.",
    price: 48,
    category: "petiscos",
  },
  {
    id: "3",
    name: "Gin Tônica Clássico",
    description: "Gin, tônica e limão.",
    price: 32,
    category: "bebidas",
  },
  {
    id: "4",
    name: "Caipirinha de Saquê",
    description: "Saquê com frutas.",
    price: 28,
    category: "bebidas",
  },
  {
    id: "5",
    name: "Petit Gâteau",
    description: "Bolo de chocolate e sorvete.",
    price: 28,
    category: "sobremesas",
  },
];

export default function AdminCardapioPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItemFormValues | null>(
    null
  );

  const form = useForm<MenuItemFormValues>({
    resolver: zodResolver(menuItemSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
    },
  });

  useEffect(() => {
    if (editingItem) {
      form.reset(editingItem);
    } else {
      form.reset({ name: "", description: "", price: 0, category: undefined });
    }
  }, [editingItem, form]);

  function onSubmit(values: MenuItemFormValues) {
    if (editingItem) {
      console.log("Atualizando item:", values);
      toast.success("Item atualizado com sucesso!");
    } else {
      console.log("Criando novo item:", values);
      toast.success("Novo item criado com sucesso!");
    }
    setIsDialogOpen(false);
    setEditingItem(null);
  }

  const handleAddNew = () => {
    setEditingItem(null);
    form.reset({ name: "", description: "", price: 0, category: undefined });
    setIsDialogOpen(true);
  };

  const handleEdit = (item: MenuItemFormValues) => {
    setEditingItem(item);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string | undefined) => {
    if (!id) return;
    console.log("Excluindo item:", id);
    toast.error("Item excluído.");
  };

  const renderMenuTable = (category: "petiscos" | "bebidas" | "sobremesas") => {
    const items = mockMenuItems.filter((item) => item.category === category);

    return (
      <Table>
        <TableHeader>
          <TableRow className="border-gray-800 hover:bg-gray-900">
            <TableHead className="text-white">Nome</TableHead>
            <TableHead className="text-white">Preço</TableHead>
            <TableHead className="text-right text-white">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow
              key={item.id}
              className="border-gray-800 hover:bg-gray-900"
            >
              <TableCell className="font-medium text-white">
                {item.name}
              </TableCell>
              <TableCell className="text-gray-300">
                {item.price.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </TableCell>
              <TableCell className="text-right space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleEdit(item)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => handleDelete(item.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  };

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-white">Gerenciar Cardápio</h1>
        <Button className="bg-red-600 hover:bg-red-700" onClick={handleAddNew}>
          <PlusCircle className="mr-2 h-5 w-5" />
          Adicionar Item
        </Button>
      </div>

      <Tabs defaultValue="petiscos" className="w-full">
        <TabsList className="mb-4 bg-gray-900">
          <TabsTrigger
            value="petiscos"
            className="data-[state=inactive]:text-white data-[state=active]:text-red-400"
          >
            <Utensils className="mr-2 h-4 w-4" /> Petiscos
          </TabsTrigger>
          <TabsTrigger
            value="bebidas"
            className="data-[state=inactive]:text-white data-[state=active]:text-red-400"
          >
            <Martini className="mr-2 h-4 w-4" /> Bebidas
          </TabsTrigger>
          <TabsTrigger
            value="sobremesas"
            className="data-[state=inactive]:text-white data-[state=active]:text-red-400"
          >
            <Cake className="mr-2 h-4 w-4" /> Sobremesas
          </TabsTrigger>
        </TabsList>

        <Card className="border-gray-800 bg-gray-950">
          <CardContent className="pt-6">
            <TabsContent value="petiscos">
              {renderMenuTable("petiscos")}
            </TabsContent>
            <TabsContent value="bebidas">
              {renderMenuTable("bebidas")}
            </TabsContent>
            <TabsContent value="sobremesas">
              {renderMenuTable("sobremesas")}
            </TabsContent>
          </CardContent>
        </Card>
      </Tabs>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-gray-950 border-gray-800 text-white">
          <DialogHeader>
            <DialogTitle className="text-red-500 text-2xl">
              {editingItem ? "Editar Item" : "Adicionar Novo Item"}
            </DialogTitle>
            <DialogDescription>
              Preencha os detalhes do item do cardápio.
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome do Item</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Batata Frita" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preço (R$)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.01"
                          placeholder="Ex: 42.00"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Categoria</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="petiscos">Petiscos</SelectItem>
                          <SelectItem value="bebidas">Bebidas</SelectItem>
                          <SelectItem value="sobremesas">Sobremesas</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Descreva o item..."
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="outline" className="text-black">
                    Cancelar
                  </Button>
                </DialogClose>
                <Button type="submit" className="bg-red-600 hover:bg-red-700">
                  Salvar
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
