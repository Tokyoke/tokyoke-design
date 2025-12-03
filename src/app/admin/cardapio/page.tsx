"use client";

import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
import useGetAllCategories from "@/hooks/react-query/categories/get-all";
import { useCreateItem } from "@/hooks/react-query/items/use-create-item";
import { useUpdateItem } from "@/hooks/react-query/items/use-update-item";
import { useDeleteItem } from "@/hooks/react-query/items/use-delete-item";
import { toast } from "sonner";

const menuItemSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres."),
  description: z
    .string()
    .min(5, "A descrição deve ter pelo menos 5 caracteres."),
  price: z.coerce.number().positive("O preço deve ser um valor positivo."),
  categoryId: z.string().min(1, "A categoria é obrigatória."),
});

type MenuItemFormValues = z.infer<typeof menuItemSchema>;

export default function AdminCardapioPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<
    (Item & { categoryId: number }) | null
  >(null);

  const { data: categories, isLoading } = useGetAllCategories();
  const createItem = useCreateItem();
  const updateItem = useUpdateItem();
  const deleteItem = useDeleteItem();

  const form = useForm<MenuItemFormValues>({
    resolver: zodResolver(menuItemSchema as any),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      categoryId: "",
    },
  });

  useEffect(() => {
    if (editingItem) {
      form.reset({
        id: editingItem.idItem.toString(),
        name: editingItem.nome,
        description: editingItem.descricao,
        price: editingItem.valor,
        categoryId: editingItem.categoryId.toString(),
      });
    } else {
      form.reset({
        name: "",
        description: "",
        price: 0,
        categoryId: "",
      });
    }
  }, [editingItem, form]);

  function onSubmit(values: MenuItemFormValues) {
    const itemData = {
      Nome: values.name,
      Descricao: values.description,
      Valor: values.price,
      Categoria_idCategoria: parseInt(values.categoryId, 10),
    };

    if (editingItem) {
      updateItem.mutate({ id: editingItem.idItem.toString(), data: itemData });
    } else {
      createItem.mutate(itemData, {
        onSuccess: () => {
          form.reset();
          toast.success("Item criado com sucesso");
        },
        onError: (e) => {
          toast.error("Erro ao criar item");
          console.error("Erro ao criar item:", e);
        },
      });
    }
    setIsDialogOpen(false);
    setEditingItem(null);
  }

  const handleAddNew = () => {
    setEditingItem(null);
    form.reset();
    setIsDialogOpen(true);
  };

  const handleEdit = (item: Item, categoryId: number) => {
    setEditingItem({ ...item, categoryId });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    deleteItem.mutate(id.toString());
  };

  if (isLoading) return <div>Carregando...</div>;

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-white">Gerenciar Cardápio</h1>
        <Button className="bg-red-600 hover:bg-red-700" onClick={handleAddNew}>
          <PlusCircle className="mr-2 h-5 w-5" />
          Adicionar Item
        </Button>
      </div>

      <Tabs defaultValue={categories?.[0]?.titulo} className="w-full">
        <TabsList className="mb-4 bg-gray-900">
          {categories?.map((category: Categorie) => (
            <TabsTrigger
              key={category.id}
              value={category.titulo}
              className="data-[state=inactive]:text-white data-[state=active]:text-red-400"
            >
              {category.titulo}
            </TabsTrigger>
          ))}
        </TabsList>

        <Card className="border-gray-800 bg-gray-950">
          <CardContent className="pt-6">
            {categories?.map((category: Categorie) => (
              <TabsContent key={category.id} value={category.titulo}>
                <Table>
                  <TableHeader>
                    <TableRow className="border-gray-800 hover:bg-gray-900">
                      <TableHead className="text-white">Nome</TableHead>
                      <TableHead className="text-white">Preço</TableHead>
                      <TableHead className="text-right text-white">
                        Ações
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {category.itens?.map((item: Item) => (
                      <TableRow
                        key={item.idItem}
                        className="border-gray-800 hover:bg-gray-900"
                      >
                        <TableCell className="font-medium text-white">
                          {item.nome}
                        </TableCell>
                        <TableCell className="text-gray-300">
                          {item.valor.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          })}
                        </TableCell>
                        <TableCell className="text-right space-x-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleEdit(item, category.id)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="icon"
                            onClick={() => handleDelete(item.idItem)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
            ))}
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
                          onChange={(e) =>
                            field.onChange(parseFloat(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="categoryId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Categoria</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories?.map((cat: Categorie) => (
                            <SelectItem key={cat.id} value={cat.id.toString()}>
                              {cat.titulo}
                            </SelectItem>
                          ))}
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
                  <Button
                    type="button"
                    variant="outline"
                    className="text-black"
                  >
                    Cancelar
                  </Button>
                </DialogClose>
                <Button
                  type="submit"
                  className="bg-red-600 hover:bg-red-700"
                  disabled={createItem.isPending || updateItem.isPending}
                >
                  {createItem.isPending || updateItem.isPending
                    ? "Salvando..."
                    : "Salvar"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
