'''
04 Micro-Clustering
In this script, we see how Bradbury performed his micro-clustering using an older version of FTIS.

https://github.com/jamesb93/interferences/blob/0773d279b98925cfa7a8b4008ab901d19af5c45b/micro_clustering.py
'''

# Import the world and corpus classes:
from ftis.world import World
from ftis.corpus import Corpus

# Import the FTIS analysers:
from ftis.analyser.dr import UMAP
from ftis.analyser.stats import Stats
from ftis.analyser.flucoma import MFCC, Noveltyslice
from ftis.analyser.audio import ExplodeAudio
from ftis.analyser.scaling import Standardise
from ftis.analyser.clustering import HDBSCAN

# Change these paths if you want to alter the inputs and outputs
INPUT_FILES = '.'
OUTPUT_FILES = './micro_clustering_output'

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
    HDBSCAN(minclustersize=16)
)

world.build(src)

# Run the script:
if __name__ == "__main__":
    world.run()