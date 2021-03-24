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
using UPP.Api.Model;
using UPP.Model;

namespace UPP.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeDepartmentsController : ControllerBase
    {
        private readonly DbEntites _context;
        private IHostEnvironment _hostEnvironment;


        public EmployeeDepartmentsController(DbEntites context, IHostEnvironment hostEnvironment)
        {
            _context = context;
            _hostEnvironment = hostEnvironment;

        }

        // GET: api/EmployeeDepartments
        [HttpGet]
        public async Task<ActionResult<IEnumerable<EmployeeDepartmentDTO>>> GetEmployeeDepartments()
        {

            var lstEmpDepts = await _context.EmployeeDepartments.ToListAsync().ConfigureAwait(false);

           var employeeDepartmentDto = lstEmpDepts
                          .Select(x => new EmployeeDepartmentDTO().InjectFrom(x)).Cast<EmployeeDepartmentDTO>()
                          .ToList();

            return employeeDepartmentDto;
        }

        // GET: api/EmployeeDepartments/5
        [HttpGet("{id}")]
        public async Task<ActionResult<EmployeeDepartmentDTO>> GetEmployeeDepartment(int id)
        {
            var employeeDepartmentDto = new EmployeeDepartmentDTO();
            var employeeDepartment = await _context.EmployeeDepartments.FindAsync(id).ConfigureAwait(false);

            if (employeeDepartment == null)
            {
                return NotFound();
            }

            employeeDepartmentDto.InjectFrom(employeeDepartment);
            return employeeDepartmentDto;
        }

        // PUT: api/EmployeeDepartments/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEmployeeDepartment(int id, EmployeeDepartmentDTO employeeDepartmentDto)
        {
            if (id != employeeDepartmentDto.EmpDeptId)
            {
                return BadRequest();
            }
            var employeeDepartment = await _context.EmployeeDepartments.FindAsync(id).ConfigureAwait(false);
            employeeDepartment.InjectFrom(employeeDepartmentDto);

            _context.Entry(employeeDepartment).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync().ConfigureAwait(false);
            }
            catch (DbUpdateConcurrencyException ex)
            {
                if (!EmployeeDepartmentExists(id))
                {
                    return NotFound();
                }
                else
                {
                    string path = Path.Combine(_hostEnvironment.ContentRootPath, "Log.txt");
                    System.IO.File.AppendAllText(@path, Environment.NewLine + DateTime.Now.ToString() + ex.ToString() + Environment.NewLine + "Error occured in the PutEmployeeDepartment method");
                }
            }

            return NoContent();
        }

        // POST: api/EmployeeDepartments
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<EmployeeDepartment>> PostEmployeeDepartment(EmployeeDepartmentDTO employeeDepartmentDto)
        {
            var employeeDepartment = new EmployeeDepartment();
            try
            {
                employeeDepartment.InjectFrom(employeeDepartmentDto);

                _context.EmployeeDepartments.Add(employeeDepartment);
                await _context.SaveChangesAsync().ConfigureAwait(false);
            }
            catch (Exception ex)
            {
                string path = Path.Combine(_hostEnvironment.ContentRootPath, "Log.txt");
                System.IO.File.AppendAllText(@path, Environment.NewLine + DateTime.Now.ToString() + ex.ToString() + Environment.NewLine + "Error occured in the Purchases PostEmployeeDepartment method");
            }
            

            return CreatedAtAction("GetEmployeeDepartment", new { id = employeeDepartment.EmpDeptId }, employeeDepartment);
        }

        // DELETE: api/EmployeeDepartments/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployeeDepartment(int id)
        {
            var employeeDepartment = await _context.EmployeeDepartments.FindAsync(id).ConfigureAwait(false);
            if (employeeDepartment == null)
            {
                return NotFound();
            }

            _context.EmployeeDepartments.Remove(employeeDepartment);
            await _context.SaveChangesAsync().ConfigureAwait(false);

            return NoContent();
        }

        private bool EmployeeDepartmentExists(int id)
        {
            return _context.EmployeeDepartments.Any(e => e.EmpDeptId == id);
        }
    }
}
