import React from 'react';
import { Card, CardDescription, CardHeader } from '../ui/card';
import { HardDrive } from 'lucide-react';

function DragCard() {
  return (
    <div className="p-3">
      <Card className="flex items-center p-2 border border-gray-200 rounded-lg shadow-sm max-w-xs w-full">
        <div className="flex-shrink-0">
          <HardDrive className="w-8 h-8 text-blue-600" />
        </div>
        <div className="ml-2 flex-1">
          <CardHeader className="text-md font-semibold text-gray-800">Google Drive</CardHeader>
          <CardDescription className="text-gray-600 text-sm mt-1">
            Here goes the card description that is very long
          </CardDescription>
        </div>
      </Card>
    </div>
  );
}

export default DragCard;
