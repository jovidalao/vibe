"use client";

import { Fragment } from "@/generated/prisma";
import { Button } from "@/components/ui/button";
import { ExternalLinkIcon, RefreshCcwIcon } from "lucide-react";
import { useState } from "react";
import { Hint } from "@/components/hint";

interface Props {
    data: Fragment;
}

export const FragmentWeb = ({ data }: Props) => {
    const [copied, setCopied] = useState(false);
    const [fragmentKey, setFragmentKey] = useState(0);
    const onRefresh = () => {
        setFragmentKey(prev => prev + 1);
    }
    const handleCopy = async () => {
        setCopied(true);
        try {
            await navigator.clipboard.writeText(data.sandboxUrl);
        } catch (err) {
            // Optionally, handle error (e.g., show a message)
        }
        setTimeout(() => {
            setCopied(false);
        }, 2000);
    }
    return (
        <div className="flex flex-col h-full w-full">
            <div className="p-2 border-b bg-sidebar flex items-center gap-x-2">
                <Hint text="Refresh" side="bottom">
                    <Button size="sm" variant="outline" onClick={onRefresh}>
                        <RefreshCcwIcon />
                    </Button>
                </Hint>
                <Hint text="Click to copy" side="bottom">
                    <Button
                        size="sm"
                        variant="outline"
                        onClick={handleCopy}
                        disabled={!data.sandboxUrl || copied}
                        className="flex-1 justify-start text-start font-normal text-muted-foreground"
                    >
                        <span className="truncate">
                            {data.sandboxUrl}
                        </span>
                    </Button>
                </Hint>
                <Hint text="Open in new tab" side="bottom" align="start">
                    <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                            if (!data.sandboxUrl) return;
                            window.open(data.sandboxUrl, "_blank");
                        }}
                        disabled={!data.sandboxUrl}
                    >
                        <ExternalLinkIcon />
                    </Button>
                </Hint>
            </div>
            <iframe
                key={fragmentKey}
                className="h-full w-full"
                sandbox="allow-forms allow-scripts allow-same-origin"
                loading="lazy"
                src={data.sandboxUrl}
            />
        </div>
    );
}