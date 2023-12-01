using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace api.Entities
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        // So thap phan hien thi Price = 2
        [Precision(38,2)]
        public decimal Price { get; set; }
        public string PictureUrl { get; set; }
        
        public ProductType ProductType{ get; set; }
        public int ProductTypeId { get; set; }
        public ProductBrand ProductBrand{ get; set; }
        public int ProductBrandId { get; set; }
        

    }
}