using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Spreadsheet;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using Omu.ValueInjecter;
using UPP.Api.Model.Helper;
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
            try
            {
                employee.InjectFrom(employeeDto);

                _context.Employees.Add(employee);
                await _context.SaveChangesAsync().ConfigureAwait(false);
            }
            catch (Exception ex)
            {
                string path = Path.Combine(_hostEnvironment.ContentRootPath, "Log.txt");
                System.IO.File.AppendAllText(@path, Environment.NewLine + DateTime.Now.ToString() + ex.ToString() + Environment.NewLine + "Error occured in the PostEmployee method");
            }

            return CreatedAtAction("GetEmployee", new { id = employee.EmployeeId }, employee);
        }

        [HttpPost]
        [Route("saveBulkEmployees")]
        public async Task<ActionResult<EmployeeDTO>> PostEmployeeBulk([FromQuery] string userType = null)
        {
            var employee = new Employee();

            try
            {
                var file = HttpContext.Request.Form.Files[0];
                if (file != null)
                {
                    var filePath = Path.Combine(Path.GetTempFileName());
                    using (var stream = System.IO.File.Create(filePath))
                    {
                        await file.CopyToAsync(stream).ConfigureAwait(false);
                        stream.Close();
                    }

                    Stream streamReader = new FileStream(filePath, FileMode.Open, FileAccess.ReadWrite, FileShare.ReadWrite);

                    using (var spreadsheetDocument = SpreadsheetDocument.Open(streamReader,false))
                    {
                        WorkbookPart workbookPart = spreadsheetDocument.WorkbookPart;
                        List<WorksheetPart> workSheets = workbookPart.WorksheetParts.OrderBy(sheet => sheet.Uri.OriginalString).ToList();
                        WorksheetPart worksheetPart = workbookPart.WorksheetParts.First();

                        var name = workSheets[0].Uri.OriginalString.Substring(workSheets[0].Uri.OriginalString.LastIndexOf('/'));
                        var nomalisedname = name.Remove(name.IndexOf('.')).TrimStart('/');

                        Sheet theSheet = workbookPart.Workbook.Descendants<Sheet>().Where(s => s.Name.Value.ToLower() == nomalisedname.ToLower()).FirstOrDefault();
                        char[] cellReferences = { 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M'};

                        List<EmployeeDTO> lstEmployeeDTO = new List<EmployeeDTO>();

                        // extract employee list from the workbook
                        ExcelFileHelper.ProcessWorkSheet(theSheet, ref lstEmployeeDTO,  workbookPart, cellReferences);

                        streamReader.Close();

                        // saving employees list
                        if (lstEmployeeDTO.Any())
                        {
                            var lstEmployee = new List<Employee>();
                            lstEmployee.InjectFrom(lstEmployeeDTO);

                            await _context.Employees.AddRangeAsync(lstEmployee).ConfigureAwait(false);
                            await _context.SaveChangesAsync().ConfigureAwait(false);

                        }
                    }
                }
     
            }
            catch (Exception ex)
            {
                string path = Path.Combine(_hostEnvironment.ContentRootPath, "Log.txt");
                System.IO.File.AppendAllText(@path, Environment.NewLine + DateTime.Now.ToString() + ex.ToString() + Environment.NewLine + "Error occured in the PostEmployeeBulk method");
            }

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
