import './App.css'
import { Button, Textarea, Card, CardBody, CardFooter } from '@heroui/react'
import { useState } from 'react'

function App() {
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null);

  // Sample background videos - replace with your actual videos
  const backgroundVideos = [
    { id: 1, name: 'Nature', thumbnail: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80' },
    { id: 2, name: 'City', thumbnail: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80' },
    { id: 3, name: 'Abstract', thumbnail: 'https://images.unsplash.com/photo-1557683316-973673baf926?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80' },
    { id: 4, name: 'Technology', thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80' },
    { id: 5, name: 'Space', thumbnail: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80' },
    { id: 6, name: 'Ocean', thumbnail: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80' },
  ];

  return (
    <div className="min-h-screen w-full bg-gray-100">
      <main className="w-full px-4 py-4 md:py-8">
        <div className="w-full bg-white rounded-lg shadow-md p-4 md:p-6 min-h-[300px] md:min-h-[500px]">
          <div className="mb-6">
            <h1 className="text-2xl md:text-4xl font-bold text-center text-indigo-600 w-full">
              Brainrot Content Generator: Turn Boring Content into Brainrot
            </h1>
          </div>

          <div className="flex flex-col w-full h-full gap-2">
            <div className="flex flex-row w-full gap-6">
              <Button color="primary" variant="solid" className="flex-1">Text Content</Button>
              <Button color="primary" variant="solid" className="flex-1">Theme Content</Button>
            </div>

            <div className="py-4">
              <Textarea
                label="Enter your content here"
                placeholder="Type or paste your content here..."
                minRows={16}
                className="w-full min-h-md"
              />
            </div>

            <p className="text-lg font-medium text-left">
              Select a Voice
            </p>
            <div className="flex flex-row gap-4 mb-2">
              <Button color="secondary" variant="bordered" className="flex-1">
                Male Voice
              </Button>
              <Button color="secondary" variant="bordered" className="flex-1">
                Female Voice
              </Button>
            </div>

            <p className="text-lg font-medium text-left mt-4 mb-4">
              Select Background Video
            </p>

            <div className="flex overflow-x-auto gap-3 pb-4 px-2 -mx-2">
              {backgroundVideos.map((video) => (
                <Card
                  key={video.id}
                  className={`flex-none cursor-pointer transition-transform hover:scale-105 rounded-xl overflow-hidden ${selectedVideo === video.id ? 'ring-2 ring-blue-500' : ''
                    }`}
                  onClick={() => setSelectedVideo(video.id)}
                  style={{ width: '160px' }}
                >
                  <CardBody className="p-0">
                    <div className="relative w-full" style={{ paddingTop: '177.78%' }}>
                      <img
                        src={video.thumbnail}
                        alt={video.name}
                        className="absolute top-0 left-0 w-full h-full object-cover"
                        onError={(e) => {
                          console.error(`Error loading image for ${video.name}`);
                          e.currentTarget.src = 'https://via.placeholder.com/160x284?text=Video';
                        }}
                      />
                    </div>
                  </CardBody>
                </Card>
              ))}
              <Card
                className="flex-none cursor-pointer transition-transform hover:scale-105 rounded-xl overflow-hidden"
                style={{ width: '160px' }}
              >
                <CardBody className="p-0">
                  <div className="relative w-full bg-gray-100" style={{ paddingTop: '177.78%' }}>
                    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-gray-500">
                      Show More
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>

            <div className="flex justify-end mt-6">
              <Button color="primary" variant="solid" size="lg">
                Generate
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
