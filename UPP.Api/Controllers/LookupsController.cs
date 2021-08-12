using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using UPP.Model;

namespace UPP.Api.Controllers
{
    [Route("api/lookups/{action}")]
    [ApiController]
    public class LookupsController : ControllerBase
    {
        private readonly DbEntites _context;
        private IHostEnvironment _hostEnvironment;
        public LookupsController(DbEntites context, IHostEnvironment hostEnvironment)
        {
            _context = context;
            _hostEnvironment = hostEnvironment;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Lookup>>> getEquity()
        {
            var list = new List<Lookup>
            {
                new Lookup
                {
                    boundValue = 0,
                    boundText = "-- select --"
                }
            };
            var result = await _context.Equities.ToListAsync().ConfigureAwait(false);
                list.AddRange(from a in result
                              select new Lookup
                              {
                                  boundValue = a.EquityId,
                                  boundText = a.EquityDesc
                              });

            return list;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Lookup>>> getGender()
        {
            var list = new List<Lookup>
            {
                new Lookup
                {
                    boundValue = 0,
                    boundText = "-- select --"
                }
            };
            var result = await _context.Genders.ToListAsync().ConfigureAwait(false);     
                list.AddRange(from a in result
                              select new Lookup
                              {
                                  boundValue = a.GenderId,
                                  boundText = a.GenderDesc
                              });


          
            return list;
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<Lookup>>> getEmployeeDepartment()
        {

            var list = new List<Lookup>
            {
                new Lookup
                {
                    boundValue = 0,
                    boundText = "-- select --"
                }
            };
            var result = await _context.EmployeeDepartments.ToListAsync().ConfigureAwait(false);
            list.AddRange(from a in result
                          select new Lookup
                          {
                              boundValue = a.EmpDeptId,
                              boundText = a.EmpDeptDesc
                          });

            return list;
        }


    }
}
