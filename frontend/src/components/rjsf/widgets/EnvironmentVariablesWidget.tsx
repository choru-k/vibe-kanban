import { FieldProps } from '@rjsf/utils';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Trash2, Plus } from 'lucide-react';

interface EnvVarEntry {
  key: string;
  value: string;
}

export const EnvironmentVariablesWidget = (props: FieldProps) => {
  const {
    formData,
    disabled,
    readonly,
    onChange,
    id,
  } = props;

  // Convert the object to array of entries for easier manipulation
  const [entries, setEntries] = useState<EnvVarEntry[]>(() => {
    if (!formData || typeof formData !== 'object') {
      return [];
    }
    return Object.entries(formData as Record<string, string>).map(([key, value]) => ({ key, value }));
  });

  // Sync entries with formData changes to fix state management bug
  useEffect(() => {
    if (!formData || typeof formData !== 'object') {
      setEntries([]);
      return;
    }
    setEntries(
      Object.entries(formData as Record<string, string>).map(([key, value]) => ({ key, value }))
    );
  }, [formData]);

  const updateEntries = (newEntries: EnvVarEntry[]) => {
    setEntries(newEntries);
    // Convert back to object
    const newObject: Record<string, string> = {};
    newEntries.forEach(entry => {
      if (entry.key.trim()) {
        newObject[entry.key.trim()] = entry.value;
      }
    });
    onChange(newObject);
  };

  const addEntry = () => {
    const newEntries = [...entries, { key: '', value: '' }];
    updateEntries(newEntries);
  };

  const removeEntry = (index: number) => {
    const newEntries = entries.filter((_, i) => i !== index);
    updateEntries(newEntries);
  };

  const updateEntry = (index: number, field: 'key' | 'value', newValue: string) => {
    const newEntries = [...entries];
    newEntries[index][field] = newValue;
    updateEntries(newEntries);
  };

  return (
    <div className="space-y-2">
      <Label htmlFor={`${id}-label`} className="text-sm font-medium">Environment Variables</Label>
      {entries.map((entry, index) => (
        <div key={index} className="flex gap-2 items-center">
          <Input
            id={`${id}-key-${index}`}
            placeholder="Variable name"
            value={entry.key}
            disabled={disabled || readonly}
            onChange={(e) => updateEntry(index, 'key', e.target.value)}
            className="flex-1"
          />
          <Input
            id={`${id}-value-${index}`}
            placeholder="Variable value"
            value={entry.value}
            disabled={disabled || readonly}
            onChange={(e) => updateEntry(index, 'value', e.target.value)}
            className="flex-1"
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => removeEntry(index)}
            disabled={disabled || readonly}
            className="p-2 h-8 w-8"
            aria-label="Remove environment variable"
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={addEntry}
        disabled={disabled || readonly}
        className="flex items-center gap-2"
      >
        <Plus className="h-3 w-3" />
        Add Environment Variable
      </Button>
    </div>
  );
};

// Export as field for React JSON Schema Form compatibility
export const EnvironmentVariablesField = EnvironmentVariablesWidget;