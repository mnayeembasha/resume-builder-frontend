import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Input } from "./ui/input"

type FormFieldTemplateProps={
    form:any;
    name:string;
    label:string;
    placeholder:string;
}
const FormFieldTemplate = ({form,name,label,placeholder}:FormFieldTemplateProps) => {
  return (
    <FormField
    control={form.control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <FormControl>
          <Input placeholder={placeholder} {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
  )
}

export default FormFieldTemplate;