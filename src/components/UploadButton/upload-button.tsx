import { UploadIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { uploadFile } from "@/app/_actions/uploadForm";

export default function UploadButton(props: any) {
    return (
        <div className={`flex flex-col items-center justify-center px-4 md:px-6 ${props.className}`}>
            <div className="space-y-4 text-center">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Upload Your Files</h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Securely upload your documents, images, and other files to our platform.
                </p>
                <form action={uploadFile} className="flex flex-col gap-4" encType="multipart/form-data">
                    <Input id="file" name="file" type="file" />
                    <Button
                        size="lg"
                        className="inline-flex h-12 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                        >
                        <UploadIcon className="mr-2 h-5 w-5" />
                        Upload Files
                        </Button>
                </form>
            </div>
        </div>
    )
}