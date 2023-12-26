using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DAO;
using api.Data;
using api.DTO;
using api.Entities;
using api.Helpers;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IWebHostEnvironment _hostEnvironment;


        public ProductsController(IUnitOfWork unitOfWork, IMapper mapper ,IWebHostEnvironment hostEnvironment)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _hostEnvironment = hostEnvironment;
       
        }

        [HttpGet]
        public ActionResult<PageList<Product>> GetProducts(
                    [FromQuery]ProductRequestParams productRequestParams,
                    [FromQuery]PaginationParams pagination
                    )
        {
            Func<IQueryable<Product>, IOrderedQueryable<Product>> sortedQuery;

            if (productRequestParams.Sort != null) {
                switch (productRequestParams.Sort)
                {
                    case "priceAsc":
                        sortedQuery = q => q.OrderBy(i => i.Price);
                        break;
                    case "priceDesc":
                        sortedQuery = q => q.OrderByDescending(i => i.Price);
                        break;
                    default:
                        sortedQuery = q => q.OrderBy(i => i.Name);
                        break;
                }
            } else {
                sortedQuery = q => q.OrderBy(i => i.Name);
            }

            IQueryable<Product> query = _unitOfWork.ProductRepository.QuerryWithCondition(
                filter: x => 
                            (string.IsNullOrEmpty(productRequestParams.Search) 
                                || x.Name.ToLower().Contains(productRequestParams.Search))
                            && (!productRequestParams.TypeId.HasValue 
                                || x.ProductTypeId == productRequestParams.TypeId) 
                            && (!productRequestParams.BrandId.HasValue 
                                || x.ProductBrandId == productRequestParams.BrandId),
                orderBy: sortedQuery,
                includeProperties: "ProductType,ProductBrand"
            );

            int totalRecord = query.Count();

            query = query.Skip(pagination.PageSize * (pagination.PageNumber - 1)).Take(pagination.PageSize);

            List<ReturnProduct> returnData = _mapper.Map<List<Product>, List<ReturnProduct>>(query.ToList());

            return Ok(new PageList<ReturnProduct>(
                pagination.PageNumber,
                pagination.PageSize,
                totalRecord,
                returnData
            ));
            // return Ok(products.Select(item => new ReturnProduct {
            //     Id = item.Id,
            //     Name = item.Name,
            //     Description = item.Description,
            //     PictureUrl = item.PictureUrl,
            //     Price = item.Price,
            //     ProductBrand = item.ProductBrand.Name,
            //     ProductType = item.ProductType.Name
            // }).ToList());
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<ReturnProduct>> GetSingleProduct(int id) {
            var query = await _unitOfWork.ProductRepository.GetEntities(
                filter: i => i.Id == id,
                orderBy: null,
                includeProperties: "ProductType,ProductBrand"
            );

            Product product = query.FirstOrDefault();
            return Ok(_mapper.Map<Product, ReturnProduct>(product));
            // return Ok(new ReturnProduct {
            //     Id = product.Id,
            //     Name = product.Name,
            //     Description = product.Description,
            //     PictureUrl = product.PictureUrl,
            //     Price = product.Price,
            //     ProductBrand = product.ProductBrand.Name,
            //     ProductType = product.ProductType.Name
            // });
        }
        [HttpPost("create")]
    public async Task<ActionResult<Product>> CreateProduct([FromForm] Product product, [FromForm] IFormFile file)
    {  

        var wwwRootPath = _hostEnvironment.WebRootPath;
        if (file != null)
        {
            var fileName = Guid.NewGuid() + Path.GetExtension(file.FileName);

            var productPath = Path.Combine(wwwRootPath, "images/products");

            await using (var fileStream = new FileStream(Path.Combine(productPath, fileName), FileMode.Create))
            {
                await file.CopyToAsync(fileStream);
            }
            product.PictureUrl = "images/products/" + fileName;
        }
        else
        {
            product.PictureUrl = "BOOK-COMIC-1000.jpg";
        }

        _unitOfWork.ProductRepository.Add(product);
         _unitOfWork.Save();

        return CreatedAtAction("GetProducts", new { id = product.Id }, product);
    }
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteProduct(int id)
    {
        var product = await _unitOfWork.ProductRepository.GetEntityById(id);
        if (product == null)
        {
            return NotFound();
        }

        // Delete image from wwwroot/image
        if (product.PictureUrl != null && !product.Name.Contains("http"))
        {
            var imagePath = Path.Combine(_hostEnvironment.WebRootPath, "images", product.PictureUrl);
            if (System.IO.File.Exists(imagePath))
                System.IO.File.Delete(imagePath);
        }

        _unitOfWork.ProductRepository.Delete(product);

        _unitOfWork.Save();

        return NoContent();
    }
      [HttpPut("{id}")]
    public async Task<IActionResult> UpdateProduct(int id, [FromForm] Product product, [FromForm] IFormFile file)
    {
        Console.WriteLine(product.Id);
    try
    {
        var existingProduct = await _unitOfWork.ProductRepository.GetEntityById(id);
        if (existingProduct == null)
        {
            return NotFound();
        }

        var wwwRootPath = _hostEnvironment.WebRootPath;

        if (file != null)
        {
            if (existingProduct.PictureUrl != null && !existingProduct.PictureUrl.Contains("http"))
            {
                var imagePath = Path.Combine(wwwRootPath, "images", existingProduct.PictureUrl);
                if (System.IO.File.Exists(imagePath))
                    System.IO.File.Delete(imagePath);
            }

            var fileName = Guid.NewGuid() + Path.GetExtension(file.FileName);
            var productPath = Path.Combine(wwwRootPath, "images");

            using (var fileStream = new FileStream(Path.Combine(productPath, fileName), FileMode.Create))
            {
                await file.CopyToAsync(fileStream);
            }

            existingProduct.PictureUrl = fileName;
        }

        existingProduct.Name = product.Name;
        existingProduct.Description = product.Description;
        existingProduct.Price = product.Price;
        existingProduct.PictureUrl = product.PictureUrl;
        existingProduct.ProductTypeId = product.ProductTypeId;
        existingProduct.ProductBrandId = product.ProductBrandId;

        _unitOfWork.ProductRepository.Update(existingProduct);
        _unitOfWork.Save();

        return NoContent();
    }
    catch (Exception)
    {
        return StatusCode(500, "Internal Server Error");
    }
}
        [HttpGet("brands")]
        public async Task<ActionResult<List<ProductBrand>>> GetProductBrands() {
            IEnumerable<ProductBrand> productBrands = await _unitOfWork.ProductBrandRepository.GetAll();
            return Ok(productBrands);
        }

        [HttpGet("types")]
        public async Task<ActionResult<List<ProductType>>> GetProductTypes() {
            IEnumerable<ProductType> productTypes = await _unitOfWork.ProductTypeRepository.GetAll();
            return Ok(productTypes);
        }
    }
}