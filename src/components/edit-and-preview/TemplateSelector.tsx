import { motion } from 'framer-motion';
import { Template } from '../../pages/edit-and-preview/types';
import { cn } from '../../lib/utils';

interface TemplateSelectorProps {
  templates: Template[];
  selectedTemplate: string;
  onSelect: (id: string) => void;
}

export function TemplateSelector({ templates, selectedTemplate, onSelect }: TemplateSelectorProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {templates.map((template) => (
        <motion.div
          key={template.id}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={cn(
            "cursor-pointer rounded-lg overflow-hidden shadow-lg transition-shadow hover:shadow-xl",
            selectedTemplate === template.id && "ring-2 ring-blue-500"
          )}
          onClick={() => onSelect(template.id)}
        >
          <img
            src={template.thumbnail}
            alt={template.name}
            className="w-full h-64 object-cover"
          />
          <div className="p-4 bg-white">
            <h3 className="text-lg font-semibold text-gray-800">{template.name}</h3>
          </div>
        </motion.div>
      ))}
    </div>
  );
}