import {
    Toast,
    ToastClose,
    ToastDescription,
    ToastProvider,
    ToastTitle,
    ToastViewport,
} from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import {
    CheckCircledIcon,
    CheckIcon,
    Cross1Icon,
    CrossCircledIcon,
    ExclamationTriangleIcon,
    InfoCircledIcon,
    QuestionMarkCircledIcon,
    QuestionMarkIcon,
} from "@radix-ui/react-icons";

export function Toaster() {
    const { toasts } = useToast();

    return (
        <ToastProvider>
            {toasts.map(function ({
                id,
                title,
                description,
                action,
                status,
                ...props
            }) {
                const icons = {
                    success: (
                        <CheckIcon className="bg-green-200 rounded-full p-0.5 text-green-700" />
                    ),
                    info: (
                        <InfoCircledIcon className="bg-blue-200 rounded-full p-0.5 text-blue-700" />
                    ),
                    warning: (
                        <ExclamationTriangleIcon className="bg-yellow-200 rounded-full p-0.5 text-yellow-700" />
                    ),
                    error: (
                        <Cross1Icon className="bg-red-200 rounded-full p-0.5 text-red-700" />
                    ),
                };

                return (
                    <Toast key={id} {...props}>
                        <div className="grid gap-1">
                            {title && (
                                <ToastTitle className="flex gap-2 items-center">
                                    {status && icons[status]}
                                    {title}
                                </ToastTitle>
                            )}
                            {description && (
                                <ToastDescription>
                                    {description}
                                </ToastDescription>
                            )}
                        </div>
                        {action}
                        <ToastClose />
                    </Toast>
                );
            })}
            <ToastViewport />
        </ToastProvider>
    );
}
