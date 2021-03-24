using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using Omu.ValueInjecter;
using UPP.Model;

namespace UPP.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private readonly DbEntites _context;
        private IHostEnvironment _hostEnvironment;

        public EmployeesController(DbEntites context, IHostEnvironment hostEnvironment)
        {
            _context = context;
            _hostEnvironment = hostEnvironment;
        }

        // GET: api/Employees
        [HttpGet]
        public async Task<ActionResult<IEnumerable<EmployeeDTO>>> GetEmployees()
        {
            var employeeDto = new List<EmployeeDTO>();
            try
            {
                var x = await _context.Employees.ToListAsync().ConfigureAwait(false);
               employeeDto = await _context.Employees.Select(c => new EmployeeDTO
                {
                    EmployeeId = c.EmployeeId,
                    Firstname = c.Firstname,
                    Lastname = c.Lastname,
                    Dob = c.Dob,
                    EmpDeptId = c.EmpDeptId,
                    EquityId = c.EquityId,
                    GenderId = c.GenderId,
                    EmployeeNo = c.EmployeeNo,
                    Website = c.Website,
                    Email = c.Email,
                    Contact = c.Contact,
                    Bio = c.Bio,
                    StartDate = c.StartDate,
                    EndDate = c.EndDate
                }).ToListAsync().ConfigureAwait(false);
            }
            catch (Exception ex)
            {
                string path = Path.Combine(_hostEnvironment.ContentRootPath, "Log.txt");
                System.IO.File.AppendAllText(@path, Environment.NewLine + DateTime.Now.ToString() + ex.ToString() + Environment.NewLine + "Error occured in the GetEmployees method");
            }
           

            return employeeDto;
        }

        // GET: api/Employees/5
        [HttpGet("{id}")]
        public async Task<ActionResult<EmployeeDTO>> GetEmployee(int id)
        {
            var employee = id != 0 ?  await _context.Employees.FindAsync(id).ConfigureAwait(false): await _context.Employees.FirstOrDefaultAsync().ConfigureAwait(false);
            if (employee == null)
            {
                return NotFound();
            }

            var employeeDto = new EmployeeDTO();        
            employeeDto.InjectFrom(employee);
 
            return employeeDto;
        }

        // PUT: api/Employees/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEmployee(int id, Employee employee)
        {
            if (id != employee.EmployeeId)
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
        public async Task<ActionResult<EmployeeDTO>> PostEmployee(EmployeeDTO employeeDto)
        {
            var employee = new Employee();
            employee.InjectFrom(employeeDto);

            _context.Employees.Add(employee);
            await _context.SaveChangesAsync().ConfigureAwait(false);

            return CreatedAtAction("GetEmployee", new { id = employee.EmployeeId }, employee);
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
            return _context.Employees.Any(e => e.EmployeeId == id);
        }
    }
}
