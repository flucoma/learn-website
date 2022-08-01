'''
03 Clustered Segmentation
In this script, we have a detailed look at Bradbury's clustered segmentation algorithm.

https://github.com/jamesb93/interferences/blob/0773d279b98925cfa7a8b4008ab901d19af5c45b/segmentation_scripts/clustered_segmentation.py
'''

# ---------------------------------------------------------------------------------
# Various imports
# ---------------------------------------------------------------------------------
from flucoma.utils import get_buffer
from flucoma import fluid
from pathlib import Path
from sklearn.preprocessing import StandardScaler
from sklearn.cluster import AgglomerativeClustering
from datetime import datetime
from reathon.nodes import Track, Item, Source, Project

# ---------------------------------------------------------------------------------
# Main parameters for experimentation:
# ---------------------------------------------------------------------------------
THRESHOLD = 0.2
WINDOWSIZE = 4
CLUSTERS = 2

# ---------------------------------------------------------------------------------
# Paths
# ---------------------------------------------------------------------------------
source = Path('./libLLVMAMDGPUDesc.a.wav')
output = Path("slices").resolve()

# ---------------------------------------------------------------------------------
# Perform slicing with FluCoMa's novelty slice (using the threshold parameter):
# ---------------------------------------------------------------------------------
slices = get_buffer(
	fluid.noveltyslice(
		source,
		threshold = THRESHOLD,
		fftsettings = [2048, -1, -1]
	)
)
slices = [int(x) for x in slices]

# ---------------------------------------------------------------------------------
# Create a structure that will add the slices to a Reaper project in order:
# ---------------------------------------------------------------------------------
standardise = StandardScaler()
original_slices = list(slices)
tracks = {}

# ---------------------------------------------------------------------------------
# Clustering
# ---------------------------------------------------------------------------------
model = AgglomerativeClustering(n_clusters=CLUSTERS)
slices = list(original_slices)
count = 0

# We will iteratively go through each slice in batches of slices set by the window size
# (0, 1, 2, 3), then (1, 2, 3, 4), then (2, 3, 4, 5) etc...:
while (count + WINDOWSIZE) <= len(slices):
	print(count)
    # -----------------------------------------------------------------------------
    # Descriptor analysis on batch
    # -----------------------------------------------------------------------------
	indices = slices[count:count+WINDOWSIZE]
	data = []
	for i, (start, end) in enumerate(zip(indices, indices[1:])):
        # Descriptor analysis:
		mfcc = fluid.mfcc(source, 
			fftsettings = [2048, -1, -1],
			startframe = start,
			numframes = end-start)

        # Stats on descriptor analysis:
		stats = get_buffer(
			fluid.stats(mfcc,
				numderivs = 1
			), "numpy")

		data.append(stats.flatten())

    # Standardize results:
	data = standardise.fit_transform(data)

    # -----------------------------------------------------------------------------
    # Use AgglomerativeClustering to find the given number of clusters in the data.
    # Then go through the data, and remove slices which are in the same cluster as the
    # previous one - this will remove a slice point, essentially grouping these slices
    # together.
    # -----------------------------------------------------------------------------
	cluster = model.fit(data)
	
	cur = -2
	for j, c in enumerate(cluster.labels_):
		prev = cur
		cur = c
		if cur == prev:
			slices.pop(j + count)

	count += 1

# ---------------------------------------------------------------------------------
# Now construct a REAPER session to demonstrate the differences
# ---------------------------------------------------------------------------------

project = Project()
src = Source(file=source)

for segs in [original_slices, slices]:
	pos = 0
	track = Track()
	for i, (start, end) in enumerate(zip(segs, segs[1:])):
		start = (start / 44100) # convert samples to seconds
		end = (end / 44100) # convert samples to seconds

		item = Item(
			src,
			length=end-start,
			soffs=start,
			position=pos
		)
		pos += end-start
		track.add(item)

	project.add(track)

project.write('clustered_segmentation.rpp')