using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Helpers
{
    public class PaginationParams
    {
        // hien thi bao nhieu san pham len trang
        public int PageNumber { get; set; } = 1;
        private int _pageSize = 6;  // default so luong trang
        private const int MaxPageSize = 50; // hien thi toi da 50 page
        public int PageSize {
            get => _pageSize;
            // if value > MaxpageSize {_pageSize = MaxPageSize} else {_pageSize = value}
            set => _pageSize = (value > MaxPageSize) ? MaxPageSize : value;
        }
    }
}