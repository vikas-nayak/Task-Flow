import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";

// Define interfaces for the API response and workflow
interface Workflow {
    id: string;
    name: string;
    description: string;
    isEnabled: boolean;
}

interface FetchWorkflowsResponse {
    workflows: Workflow[];
}

const WorkflowCard = () => {
    const { user } = useUser();
    const [workflows, setWorkflows] = useState<Workflow[]>([]);

    useEffect(() => {
        if (!user) return;

        const fetchWorkflows = async () => {
            try {
                const response = await fetch('/api/workflows', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const result: FetchWorkflowsResponse = await response.json();
                    setWorkflows(result.workflows);
                } else {
                    console.error('Failed to fetch workflows');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchWorkflows();
    }, [user,workflows]);

    const onDelete = async (workflowId: string) => {
        try {
            const response = await fetch('/api/workflows', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ workflowId }),
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Workflow deleted:', result);
                setWorkflows((prevWorkflows) =>
                    prevWorkflows.filter((workflow) => workflow.id !== workflowId)
                );
            } else {
                console.error('Failed to delete workflow');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleToggle = async (workflowId: string, isEnabled: boolean) => {
        try {
            const response = await fetch(`/api/workflows/${workflowId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ isEnabled: !isEnabled }), // Include the payload
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Workflow updated:', result);
                setWorkflows((prevWorkflows) =>
                    prevWorkflows.map((workflow) =>
                        workflow.id === workflowId ? { ...workflow, isEnabled: !isEnabled } : workflow
                    )
                );
            } else {
                const errorText = await response.text(); // Get response text for details
                console.error('Failed to update workflow:', errorText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            {workflows.map((workflow) => (
                <Card key={workflow.id} className="relative m-4">
                    <Button
                        variant="ghost"
                        className="absolute top-2 right-2"
                        onClick={() => onDelete(workflow.id)}
                    >
                        <Trash2 color="orange" />
                    </Button>
                    <Link href={`/workflows/${workflow.id}`}>
                        <CardHeader>
                            <CardTitle>{workflow.name}</CardTitle>
                            <CardDescription>{workflow.description}</CardDescription>
                        </CardHeader>
                    </Link>
                    <CardContent className="flex justify-start space-x-4">
                        <img src="/googleDrive.png" alt="Google Drive" className="w-8 h-8" />
                        <img src="/notion.png" alt="Notion" className="w-8 h-8" />
                        <img src="/discord.png" alt="Discord" className="w-8 h-8" />
                    </CardContent>
                    <div className="absolute bottom-5 right-5 flex items-center space-x-2">
                        <Label htmlFor={`workflow-${workflow.id}`}>On</Label>
                        <Switch
                            // id={`workflow-${workflow.id}`}
                            // checked={workflow.isEnabled}
                            // onCheckedChange={() => handleToggle(workflow.id, workflow.isEnabled)}
                        />
                    </div>
                </Card>
            ))}
        </div>
    );
};

export default WorkflowCard;
