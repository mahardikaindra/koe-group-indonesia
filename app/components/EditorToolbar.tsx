import {
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
} from "lucide-react";

const ToolbarButton = ({
  icon,
  onClick,
}: {
  icon: React.ReactNode;
  onClick: () => void;
}) => (
  <button
    type="button"
    onClick={onClick}
    className="p-1.5 hover:bg-emerald-100 hover:text-emerald-800 rounded text-slate-500 transition-colors"
  >
    {icon}
  </button>
);

const EditorToolbar = ({
  onCommand,
}: {
  onCommand: (command: string, value?: string) => void;
}) => {
  return (
    <div className="flex flex-wrap items-center gap-1 p-2 bg-slate-50 border-b border-slate-200 rounded-t-lg">
      <div className="flex items-center gap-1 pr-2 border-r border-slate-200">
        <select
          onChange={(e) => onCommand("fontName", e.target.value)}
          className="text-xs p-1 rounded border border-slate-200 outline-none bg-white"
        >
          <option value="Inter">Sans Serif</option>
          <option value="Georgia">Serif</option>
          <option value="Courier New">Monospace</option>
          <option value="Arial Black">Bold Impact</option>
        </select>
        <select
          onChange={(e) => onCommand("fontSize", e.target.value)}
          className="text-xs p-1 rounded border border-slate-200 outline-none bg-white"
        >
          <option value="3">Normal</option>
          <option value="1">Small</option>
          <option value="5">Large</option>
          <option value="7">Huge</option>
        </select>
      </div>
      <div className="flex items-center gap-0.5 pr-2 border-r border-slate-200 ml-1">
        <ToolbarButton
          icon={<Bold size={16} />}
          onClick={() => onCommand("bold")}
        />
        <ToolbarButton
          icon={<Italic size={16} />}
          onClick={() => onCommand("italic")}
        />
        <ToolbarButton
          icon={<Underline size={16} />}
          onClick={() => onCommand("underline")}
        />
      </div>
      <div className="flex items-center gap-0.5 pr-2 border-r border-slate-200 ml-1">
        <ToolbarButton
          icon={<AlignLeft size={16} />}
          onClick={() => onCommand("justifyLeft")}
        />
        <ToolbarButton
          icon={<AlignCenter size={16} />}
          onClick={() => onCommand("justifyCenter")}
        />
        <ToolbarButton
          icon={<AlignRight size={16} />}
          onClick={() => onCommand("justifyRight")}
        />
      </div>
      <div className="flex items-center gap-0.5 ml-1">
        <ToolbarButton
          icon={<List size={16} />}
          onClick={() => onCommand("insertUnorderedList")}
        />
        <ToolbarButton
          icon={<ListOrdered size={16} />}
          onClick={() => onCommand("insertOrderedList")}
        />
      </div>
    </div>
  );
};
export default EditorToolbar;
