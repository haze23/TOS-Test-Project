using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Omu.ValueInjecter;
using TosProject.Model;
using TosProject.Model.Dto;

namespace TosProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private readonly DbEntites _context;

        public EmployeesController(DbEntites context)
        {
            _context = context;
        }

        // GET: api/Employees
        [HttpGet]
        public async Task<ActionResult<IEnumerable<EmployeeDto>>> GetEmployees()
      {
            var employeeDto = await _context.Employees.Select(c => new EmployeeDto 
            {
               Id = c.Id,
               Firstname = c.Firstname,
               Lastname = c.Lastname,
               Website = c.Website,
               Email = c.Email,
               Contact = c.Contact,
               Bio = c.Bio
            
            }).ToListAsync().ConfigureAwait(false);

            return employeeDto;
        }

        // GET: api/Employees/5
        [HttpGet("{id}")]
        public async Task<ActionResult<EmployeeDto>> GetEmployee(int id)
        {
            var employee = id != 0 ?  await _context.Employees.FindAsync(id).ConfigureAwait(false): await _context.Employees.FirstOrDefaultAsync().ConfigureAwait(false);
            if (employee == null)
            {
                return NotFound();
            }

            var employeeDto = new EmployeeDto();        
            employeeDto.InjectFrom(employee);
 
            return employeeDto;
        }

        // PUT: api/Employees/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEmployee(int id, Employee employee)
        {
            if (id != employee.Id)
            {
                return BadRequest();
            }

            _context.Entry(employee).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync().ConfigureAwait(false);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EmployeeExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Employees
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<EmployeeDto>> PostEmployee(EmployeeDto employeeDto)
        {
            var employee = new Employee();
            employee.InjectFrom(employeeDto);

            _context.Employees.Add(employee);
            await _context.SaveChangesAsync().ConfigureAwait(false);

            return CreatedAtAction("GetEmployee", new { id = employee.Id }, employee);
        }

        // DELETE: api/Employees/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Employee>> DeleteEmployee(int id)
        {
            var employee = await _context.Employees.FindAsync(id).ConfigureAwait(false);
            if (employee == null)
            {
                return NotFound();
            }

            _context.Employees.Remove(employee);
            await _context.SaveChangesAsync().ConfigureAwait(false);

            return employee;
        }

        private bool EmployeeExists(int id)
        {
            return _context.Employees.Any(e => e.Id == id);
        }
    }
}
