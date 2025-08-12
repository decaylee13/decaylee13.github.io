import cellpose
import numpy as np
import matplotlib.pyplot as plt
from cellpose import models
import torch
from tifffile import imread
import warnings
warnings.filterwarnings('ignore')  # Suppress OME-TIFF warnings

# Check if MPS is available and use it
device = torch.device('mps' if torch.backends.mps.is_available() else 'cpu')
print(f"Using device: {device}")

# Initialize the model with the correct device
model = models.Cellpose(gpu=False, model_type='cyto3')  
print("Model loaded")

# Load both channels
channel0 = imread('/Users/dklee/Documents/Research/tubhiswt-3D/tubhiswt_C0.ome.tif')
channel1 = imread('/Users/dklee/Documents/Research/tubhiswt-3D/tubhiswt_C1.ome.tif')

print(f"Channel 0 shape: {channel0.shape}")
print(f"Channel 1 shape: {channel1.shape}")

# Combine channels if needed (assuming they're the same size)
# This creates a 4D array: (channels, z, y, x)
data = np.stack([channel0, channel1], axis=0)
print(f"Combined data shape: {data.shape}")
print(f"Data type: {data.dtype}")
print(f"Data range: [{data.min()}, {data.max()}]")

