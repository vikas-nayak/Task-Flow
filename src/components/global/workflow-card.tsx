import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

const WorkflowCard = () => {
    return (
        <Card className='relative m-4'>
            <CardHeader>
                <CardTitle>Automation Task 1</CardTitle>
                <CardDescription>This will be the description of the task</CardDescription>
            </CardHeader>
            <CardContent className='flex justify-start space-x-4'>
                <img src="/googleDrive.png" alt="Logo 1" className='w-8 h-8' />
                <img src="/notion.png" alt="Logo 2" className='w-8 h-8' />
                <img src="/discord.png" alt="Logo 3" className='w-8 h-8' />
            </CardContent>
            <div className='absolute bottom-5 right-5 flex items-center space-x-2'>
                <Label htmlFor="airplane-mode">On</Label>
                <Switch id="airplane-mode" />
            </div>
        </Card>
    )
}

export default WorkflowCard
