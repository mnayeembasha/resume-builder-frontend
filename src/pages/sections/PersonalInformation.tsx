import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../components/ui/form"
import { Input } from "../../components/ui/input"

const PersonalInformation = ({form,name}) => {
  return (
    <div>
        <FormField
              control={form.control}
              name={name}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enter your Photo URL</FormLabel>
                  <FormControl>
                    <Input placeholder="enter your image url" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
    </div>
  )
}

export default PersonalInformation