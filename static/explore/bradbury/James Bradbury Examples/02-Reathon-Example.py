'''
02 Reathon Example
In this script, we take a look at Bradbury's Reathon library.

Install using pip install reathon.
https://github.com/jamesb93/reathon
'''

# Import the various node classes from reathon:
from reathon.nodes import Project, Track, Item, Source

# And import the random module for some fun:
import random

# Create a project containing the track
project = Project()

# Create a track
track = Track(name='basic item')

# Create an audio source
src = Source(file='./libLLVMAMDGPUDesc.a.wav')

# Add an audio item to the start of the track for 20 seconds:
track.add(
    Item(
        src,
        position=0,
        length=20
    )
)

# Now add the track to the project
project.add(track)

# Of course, these kinds of operations can be performed programatically - think of the possibilities!
granulated_track = Track(name='granulation')

pos = 0.0 # set our initial position to 0
for x in range(1000): # 1000 grains    
    length = random.uniform(0.001, 0.03) # random length of the item
    offset = random.uniform(0.0, 30.0)

    granulated_track.add(
        Item(
            src,
            position = pos, # and we set the position
            length = length, # and we set the length
            soffs = offset # and a random start point
        )
    )
    pos += length # increment the position by the length to create contiguous blocks

project.add(granulated_track)
# Save the project to disk as an rpp file, and open in reaper to see the results:
project.write('reathon_example_project.rpp')