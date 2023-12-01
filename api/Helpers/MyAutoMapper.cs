using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTO;
using api.Entities;
using AutoMapper;

namespace api.Helpers
{
    public class MyAutoMapper : Profile
    {
        // su dung de sao chep du lieu cua product sang returnproduct
        public MyAutoMapper()
        {
            CreateMap<Product , ReturnProduct>()
            .ForMember(d => d.ProductBrand , o => o.MapFrom(s => s.ProductBrand.Name))
            .ForMember(d => d.ProductType , o => o.MapFrom(s => s.ProductType.Name))
            .ForMember(d => d.PictureUrl, o => o.MapFrom<ProductImageUrlResolver>());

        }
    }
}