import { BookOpen, PlusCircle } from "lucide-react";
import Card from "./Card";
import Button from "./Button";

const EmptyState = ({ onAdd }: { onAdd: () => void }) => {
  return (
    <Card className="py-20 flex flex-col items-center justify-center text-center border-dashed border-2 bg-slate-50/50">
      <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mb-4">
        <BookOpen size={30} />
      </div>
      <h3 className="text-xl font-bold mb-1">Belum Ada Publikasi</h3>
      <p className="text-slate-500 text-sm max-w-xs mb-6">
        Mulai buat dokumen blog pertama untuk memberikan informasi layanan
        legalitas Anda.
      </p>
      <Button onClick={onAdd}>
        <PlusCircle size={18} /> Buat Sekarang
      </Button>
    </Card>
  );
};
export default EmptyState;
