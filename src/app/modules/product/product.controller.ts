import { Request, Response } from 'express';
import { productServices } from './product.service';
import { productValidationSchema, updateBiCycleValidationSchema } from './product.validation';
import { IProduct } from './product.interface';

// create Bi Cycle
const createABiCycle = async (req: Request, res: Response) => {
  try {
    const biCycle = req.body;
    const zodParsedData = productValidationSchema.parse(biCycle)
    const result = await productServices.createABiCycle(zodParsedData as IProduct);
    res.status(200).json({
      success: true,
      message: 'Bicycle created successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'something went wrong while creating BiCycle',
      error,
    });
  }
};

// Get all Bi Cycle
const getAllByiCycle = async (req: Request, res: Response) => {
  try {
    const query = req.query
    const result = await productServices.getAllBiCycle(query);
    
    res.status(200).json({
      success: true,
      message: 'Bicycles retrieved successfully',
      data: result,
    });
  } catch (error) {
    res.status(200).json({
      success: false,
      message: 'Something went wrong while retrieving BiCycle',
      error,
    });
  }
};

// Get a single Bi Cycle
const getABiCycle = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    const result = await productServices.getABiCycle(productId);
    if(result === null){
      res.status(404).json({
        success: false,
        message: 'Bi-Cycle not found',
        data:{}
      });
    }else{
      res.status(200).json({
        success: true,
        message: 'BiCycle retrieved successfully',
        data: result,
      });  
    }
    
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Something went wrong finding bi-cycle',
      error,
    });
  }
};

// Update a Bi Cycle
const updateABiCycle = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    const updateData = req.body;
    const zodParsedData = updateBiCycleValidationSchema.parse(updateData)
    const result = await productServices.updateABiCycle(productId, zodParsedData);
    if (result) {
      res.status(200).json({
        success: true,
        message: 'BiCycle updated successfully',
        data: result,
      });
    } else {
      res.status(404).json({
        success: true,
        message: 'BiCycle not found',
        data: null,
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Something went wrong while updating BiCycle',
      error,
    });
  }
};

// Delete a Bi Cycle
const deleteBiCycle = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    const result = await productServices.deleteBiCycle(productId);
    if(result === null){
        res.status(200).json({
            success: true,
            message: 'Bicycle not found',
            data: result,
          });    
    }else{
        res.status(200).json({
            success: true,
            message: 'Bicycle deleted successfully',
            data: result,
          });
    }
    
  } catch (error) {
    res.status(200).json({
      success: true,
      message: 'something went wrong while deleting Bi Cycle',
      error,
    });
  }
};

export const productControllers = {
  createABiCycle,
  getAllByiCycle,
  getABiCycle,
  updateABiCycle,
  deleteBiCycle,
};
