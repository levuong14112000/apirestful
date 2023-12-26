using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Entities;
using Microsoft.EntityFrameworkCore;

namespace api.DTO
{
    public class ReturnProduct
    {
          public int Id { get; set; }
        public string name { get; set; }
        public string Description { get; set; }
        // So thap phan hien thi Price = 2
        [Precision(38,2)]
        public decimal Price { get; set; }
        public string PictureUrl { get; set; }
        
        public string ProductType{ get; set; }
        public string ProductTypeId{ get; set; }
        public string ProductBrand{ get; set; }
    }
}