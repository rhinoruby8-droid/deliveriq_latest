import { useParams } from 'react-router-dom';
import { DynamicForm } from '../components/cms/DynamicForm';

export default function EmbedFormPage() {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return <div className="p-4 text-red-500">Form ID not provided.</div>;
  }

  return (
    <div className="w-full h-full min-h-screen bg-muted p-4 font-sans text-foreground">
      <DynamicForm formId={id} forceNative={true} />
    </div>
  );
}
