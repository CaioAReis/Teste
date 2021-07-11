using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace VesteMeAPI.Data
{
    public class AplicationDBContext : DbContext 
    {
        public AplicationDBContext(DbContextOptions<AplicationDBContext> options) : base(options) { }
    }
}
