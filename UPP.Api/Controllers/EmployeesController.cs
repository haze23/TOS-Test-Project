using System;
using System.Collections.Generic;
using System.Data;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using DocumentFormat.OpenXml;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Spreadsheet;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using Newtonsoft.Json;
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
        private readonly IWebHostEnvironment _webHostEnvironment;

        public EmployeesController(DbEntites context, IHostEnvironment hostEnvironment, IWebHostEnvironment webHostEnvironment)
        {
            _context = context;
            _hostEnvironment = hostEnvironment;
            _webHostEnvironment = webHostEnvironment;
        }

        // GET: api/Employees
        [HttpGet]
        public async Task<ActionResult<IEnumerable<EmployeeDTO>>> GetEmployees()
        {
            var employeeDto = new List<EmployeeDTO>();
            try
            {
                //var lstImageUrl = new List<string>();
                //for (int i = 0; i < 7; i++)
                //{
                //    lstImageUrl.Add(Guid.NewGuid().ToString());
                //}
                //var x = await _context.Employees.ToListAsync().ConfigureAwait(false);
               employeeDto = await _context.Employees.Include(s => s.Gender).Include(s => s.EmployeeDepartment).Include(s => s.Equity).Select(c => new EmployeeDTO
                {
                    EmployeeId = c.EmployeeId,
                    Firstname = c.Firstname,
                    Lastname = c.Lastname,
                    Dob = c.Dob,
                    EmpDeptId = c.EmpDeptId,
                    EmpDeptDesc = c.EmployeeDepartment.EmpDeptDesc,
                    EquityId = c.EquityId,
                    EquityDesc = c.Equity.EquityDesc,
                    GenderId = c.GenderId,
                    GenderDesc = c.Gender.GenderDesc,
                    EmployeeNo = c.EmployeeNo,
                    Website = c.Website,
                    Email = c.Email,
                    Contact = c.Contact,
                    ImageUrl = c.ImageUrl,
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

        [HttpGet]
        [Route("getEmployeeImage")]
        public async Task<JsonResult> GetImage(string id)
        {
            string strImage = string.Empty;
            string defaultImage = "default-person-img.png";
            byte[] bytImage;
            string path = string.Empty;

            try
            {
                //string uploadsFolder = Path.Combine(_hostEnvironment.ContentRootPath, "Images");
                //var image = System.IO.File.OpenRead(path: uploadsFolder + @"\" + id);
                //return File(image, "image/png");

                if (string.IsNullOrEmpty(id).Equals(false) && _context.Employees.Any(c => c.ImageUrl == id))
                {
                    id = id + ".png";
                    path = _hostEnvironment.ContentRootPath + "/images/" + id;                  
                }
                else
                {
                    path = _hostEnvironment.ContentRootPath + "/images/" + defaultImage;
                }

                bytImage = System.IO.File.ReadAllBytes(path);
                strImage = "data:image/png;base64," + Convert.ToBase64String(bytImage);
            }
            catch (Exception ex)
            {
                string logPath = Path.Combine(_hostEnvironment.ContentRootPath, "Log.txt");
                System.IO.File.AppendAllText(logPath, Environment.NewLine + DateTime.Now.ToString() + ex.ToString() + Environment.NewLine + "Error occured in the GetImage method");

                strImage = _hostEnvironment.ContentRootPath + "/images/" + defaultImage;
            }

            return new JsonResult(strImage);
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
        [Route("saveEmployee")]
        public async Task<ActionResult<EmployeeDTO>> PostEmployee(/*EmployeeDTO employeeDto*/)
        {
            var employee = new Employee();
            try
            {
                var employeeDto = JsonConvert.DeserializeObject<EmployeeDTO>(HttpContext.Request.Form["employeeDto"]);

                var file = HttpContext.Request.Form.Files[0];

                string uploadsFolder = Path.Combine(_hostEnvironment.ContentRootPath, "Images");

                string uniqueFileName = Guid.NewGuid().ToString();
                var filePath = Path.Combine(uploadsFolder, uniqueFileName);

                if (file != null)
                {
                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        await file.CopyToAsync(stream).ConfigureAwait(false);
                        employeeDto.ImageUrl = uniqueFileName;
                    }
                }

                employee.InjectFrom(employeeDto);

                _context.Employees.Add(employee);
                await _context.SaveChangesAsync().ConfigureAwait(false);
            }
            catch (Exception ex)
            {
                string path = Path.Combine(_hostEnvironment.ContentRootPath, "Log.txt");
                System.IO.File.AppendAllText(@path, Environment.NewLine + DateTime.Now.ToString() + ex.ToString() + Environment.NewLine + "Error occured in  PostEmployee method");
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

                    using (var spreadsheetDocument = SpreadsheetDocument.Open(streamReader, false))
                    {
                        WorkbookPart workbookPart = spreadsheetDocument.WorkbookPart;
                        List<WorksheetPart> workSheets = workbookPart.WorksheetParts.OrderBy(sheet => sheet.Uri.OriginalString).ToList();
                        WorksheetPart worksheetPart = workbookPart.WorksheetParts.First();

                        var name = workSheets[0].Uri.OriginalString.Substring(workSheets[0].Uri.OriginalString.LastIndexOf('/'));
                        var nomalisedname = name.Remove(name.IndexOf('.')).TrimStart('/');

                        Sheet theSheet = workbookPart.Workbook.Descendants<Sheet>().Where(s => s.Name.Value.ToLower() == nomalisedname.ToLower()).FirstOrDefault();
                        char[] cellReferences = { 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'};

                        List<EmployeeDTO> lstEmployeeDTO = new List<EmployeeDTO>();

                        // extract employee list from the workbook
                        ExcelFileHelper.ProcessWorkSheet(theSheet, ref lstEmployeeDTO, workbookPart, cellReferences);

                        streamReader.Close();

                        // saving employees list
                        if (lstEmployeeDTO.Any())
                        {
                         
                            IList<Employee> lstEmployee = lstEmployeeDTO.Select(x => new Employee().InjectFrom(x)).Cast<Employee>().ToList();

                            await _context.Employees.AddRangeAsync(lstEmployee).ConfigureAwait(false);
                            await _context.SaveChangesAsync().ConfigureAwait(false);

                        }
                    }
                }
     
            }
            catch (Exception ex)
            {
                string path = Path.Combine(_hostEnvironment.ContentRootPath, "Log.txt");
                System.IO.File.AppendAllText(@path, Environment.NewLine + DateTime.Now.ToString() + ex.ToString() + Environment.NewLine + "Error occured in  PostEmployeeBulk method");
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
