import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../components/ui/form"
import { Textarea } from "../../components/ui/textarea"

const Summary = ({form,name}) => {
  return (
    <div>
        <FormField
              control={form.control}
              name={name}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Summary: (1-2 lines about yourself, your career aspirations, or an introduction)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="present yourself.." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
    </div>
  )
}

export default Summary