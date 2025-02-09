import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { LABEL_COLORS } from "../constants";
import { Button } from "@/components/ui/button";
import { createNewLabelFormSchema } from "../schema";
import { RadioGroup } from "@/components/ui/radio-group";
import { RadioGroupItem } from "@radix-ui/react-radio-group";
import { ArrowLeft, Loader2 } from "lucide-react";
import { createNewLabelAction } from "../actions";
import { toast } from "sonner";
import { useParams } from "next/navigation";

type FormValue = z.infer<typeof createNewLabelFormSchema>;

export type CreateNewLabelFormProps = {
  boardId: string;
  onBackLabel?: () => void;
};

export default function CreateNewLabelForm({
  boardId,
  onBackLabel,
}: CreateNewLabelFormProps) {
  const form = useForm({
    resolver: zodResolver(createNewLabelFormSchema),
    defaultValues: {
      title: "",
      color: "",
    },
  });

  async function onSubmit(values: FormValue) {
    const [_, error] = await createNewLabelAction({
      ...values,
      boardId,
    });

    if (error) {
      toast.error(error.message);
      return;
    }
    onBackLabel?.();
  }

  return (
    <div className="block">
      <div className="flex items-center gap-2 mb-4">
        {onBackLabel && (
          <Button onClick={onBackLabel} variant="link" size="icon">
            <ArrowLeft />
          </Button>
        )}

        <h1 className="text-xs">Create new label</h1>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-1 gap-2"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Enter your label name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="color"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex gap-1 items-center"
                  >
                    {LABEL_COLORS.map((item) => (
                      <FormItem key={item.hex}>
                        <FormControl>
                          <RadioGroupItem
                            value={item.hex}
                            style={{ backgroundColor: item.hex }}
                            className="size-6 rounded data-[state=checked]:ring"
                          />
                        </FormControl>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-fit">
            {form.formState.isSubmitting && (
              <Loader2 className="mr-2 animate-spin" />
            )}
            Save
          </Button>
        </form>
      </Form>
    </div>
  );
}
