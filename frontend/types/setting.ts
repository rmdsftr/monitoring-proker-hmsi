export interface BeforeProps{
    onSave: () => void;
    onConfirm: (message: string, type: "success" | "error") => void;
    onRefresh: () => void;
}

export interface ManajemenProps {
    mode: "before" | "after";
    onChange: (mode: "before" | "after") => void;
    onEdit: (mode: string) => void;
    onConfirm: (message: string, type: "success" | "error") => void;
    onAlert: (msg:string, type: "success" | "error") => void;
}