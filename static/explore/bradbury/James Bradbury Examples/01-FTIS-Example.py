'''
01 FTIS Example
In this script, we take a look at Bradbury's Finding Things In Stuff library.

Install the library with pip install ftis. Also make sure you have the latest
version of the FluCoMa CLI tools in your path.
https://github.com/jamesb93/ftis
'''

# Import the world and corpus classes:
from ftis.world import World
from ftis.corpus import Corpus

# Also, import the various analysers you wish to use:
from ftis.analyser.dr import UMAP
from ftis.analyser.stats import Stats
from ftis.analyser.flucoma import MFCC, Noveltyslice
from ftis.analyser.audio import ExplodeAudio
from ftis.analyser.scaling import Standardise
from ftis.analyser.clustering import AgglomerativeClustering

# Change these paths if you want to alter the inputs and outputs
INPUT_FILES = '.'
OUTPUT_FILES = './output'

# Load a folder of sounds we wish to analyse, and set an output location for the results:
src = Corpus(INPUT_FILES)

# Create an instance of the world object:
world = World(sink=OUTPUT_FILES)

# Connect processes with >>:
(
    src >>
    Noveltyslice(threshold=0.5) >>
    ExplodeAudio() >>
    MFCC() >>
    Stats(numderivs=1, flatten=True) >>
    Standardise() >>
    UMAP(components=6) >>
    AgglomerativeClustering(numclusters=4)
)

world.build(src)

# Run the script:
if __name__ == "__main__":
    world.run()