import { useParams } from 'react-router-dom';
import { DynamicForm } from '../components/cms/DynamicForm';

export default function EmbedFormPage() {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return <div className="p-4 text-red-500">Form ID not provided.</div>;
  }

  return (
    <div className="w-full h-full min-h-screen bg-[#13151A] p-4 font-sans text-[#F0EDE8]">
      <DynamicForm formId={id} />
    </div>
  );
}
