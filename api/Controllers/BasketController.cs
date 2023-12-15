using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using api.DAO;
using api.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BasketController : ControllerBase
    {
       private readonly IBasketResponsitory _basketResponsitory;
       public BasketController( IBasketResponsitory basketResponsitory)
       {
        _basketResponsitory = basketResponsitory;
       }
       [HttpGet]
       public async Task<ActionResult<CustomerBasket>> GetBasketById(string id)
       {
        var basket = await _basketResponsitory.GetBasketAsync(id);
        return Ok(basket ?? new CustomerBasket(id));
       }
       [HttpPost]
       public async Task<ActionResult<CustomerBasket>> UpdateBasket(CustomerBasket basket)
       {
            var updateBasket = await _basketResponsitory.UpdateBasketAsync(basket);
            return Ok(updateBasket);
       }
       [HttpDelete]
       public async Task DeleteBasketAsync(string id)
       {
        await _basketResponsitory.DeleteBasketAsync(id);
       }
    }
}