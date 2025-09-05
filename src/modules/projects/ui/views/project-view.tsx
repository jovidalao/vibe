"use client";

import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";

import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable";
import { MessageContainer } from "../components/messages-container";
import { Suspense } from "react";

interface Props {
    projectId: string;
};

export const ProjectView = ({ projectId }: Props) => {
    const trpc = useTRPC();
    const { data: project } = useQuery(trpc.projects.getOne.queryOptions({
        id: projectId
    }));

    return (
        <div className="h-screen">
            <ResizablePanelGroup direction="horizontal">
                <ResizablePanel
                    defaultSize={35}
                    minSize={25}
                    className="flex flex-col min-h-0"
                >
                    <Suspense fallback={<div>Loading messages...</div>}>
                        <MessageContainer projectId={projectId} />
                    </Suspense>
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel
                    defaultSize={65}
                    minSize={50}
                    className="flex flex-col min-h-0"
                >
                    TODO: Preview panel
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    )
}