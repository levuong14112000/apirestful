using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using api.Entities;
using StackExchange.Redis;

namespace api.DAO
{
    public class BasketReponsitory : IBasketResponsitory
    {
        private readonly IDatabase _database;
        private readonly IUnitOfWork _unitOfWork;
        private IConfiguration _config;
        public BasketReponsitory(IConfiguration config,IConnectionMultiplexer redis ,IUnitOfWork unitOfWork )
        {
            _database = redis.GetDatabase();
            _unitOfWork = unitOfWork;
            _config = config;
        }
        public async Task<bool> DeleteBasketAsync(string basketId)
        {
            // tuong tac voi database phai await
           return await _database.KeyDeleteAsync(basketId);
        }

        public async Task<CustomerBasket> GetBasketAsync(string basketId)
        {
            var data = await _database.StringGetAsync(basketId);
            return data.IsNullOrEmpty ? null : JsonSerializer.Deserialize<CustomerBasket>(data);
        }

        public async Task<CustomerBasket> UpdateBasketAsync(CustomerBasket basket)
        {
            List<BasketItem> newList = new List<BasketItem>();
            foreach (var item in basket.Items)
            {
                var query = await _unitOfWork.ProductRepository.GetEntities(
                    filter : i => i.Id == item.Id,
                    orderBy : null,
                    includeProperties : "ProductType,ProductBrand"
                );
                Product product = query.FirstOrDefault();
                BasketItem basketItem = new BasketItem
                {
                    Id = product.Id,
                    ProductName = product.Name,
                    Price = product.Price,
                    Quantity = item.Quantity,
                    PictureUrl = _config["ApiUrl"] + product.PictureUrl,
                    Brand = product.ProductBrand.Name,
                    Type = product.ProductType.Name  
                };
                 newList.Add(basketItem);
            }
           basket.Items = newList;
         var created =  await _database.StringSetAsync(basket.Id,JsonSerializer.Serialize(basket),TimeSpan.FromDays(30));
        if(!created){
            return null;      
        }
        return await GetBasketAsync(basket.Id);
        }
    }
}