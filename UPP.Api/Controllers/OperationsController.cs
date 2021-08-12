using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using Omu.ValueInjecter;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using UPP.Api.Model;
using UPP.Model;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace UPP.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OperationsController : ControllerBase
    {
        private readonly DbEntites _context;
        private IHostEnvironment _hostEnvironment;
        public OperationsController(DbEntites context, IHostEnvironment hostEnvironment)
        {
            _context = context;
            _hostEnvironment = hostEnvironment;
        }

        #region Consignor & Consignee
        // GET: api/Operations/GetConsignor

        [HttpGet,Route("GetConsignor")]
        public async Task<ActionResult<IEnumerable<ConsignorDTO>>> GetConsignor()
        {
            var consignorDto = new List<ConsignorDTO>();
            try
            {
                var consignor = await _context.Consignor.ToListAsync().ConfigureAwait(false);
                consignorDto = consignor.Select(x => new ConsignorDTO().InjectFrom(x)).Cast<ConsignorDTO>()
                                        .ToList();
            }
            catch (Exception ex)
            {
                string path = Path.Combine(_hostEnvironment.ContentRootPath, "Log.txt");
                System.IO.File.AppendAllText(@path, Environment.NewLine + DateTime.Now.ToString() + ex.ToString() + Environment.NewLine + "Error occured in  GetConsignor method");
            }
            return consignorDto;
        }

        // GET api/Operations/GetConsignor/5
        [HttpGet,Route("GetConsignor/{id}")]
        public async Task<ActionResult<ConsignorDTO>> GetConsignor(int id)
        {
            var consignorDto = new ConsignorDTO();
            try
            {
                if (id == 0)
                {
                    return NotFound();
                }
                var consignor = await _context.Consignor.FindAsync(id).ConfigureAwait(false);
                consignorDto.InjectFrom(consignor);
            }
            catch (Exception ex)
            {
                string path = Path.Combine(_hostEnvironment.ContentRootPath, "Log.txt");
                System.IO.File.AppendAllText(@path, Environment.NewLine + DateTime.Now.ToString() + ex.ToString() + Environment.NewLine + "Error occured in  GetConsignor method");
            }
            return Ok(consignorDto);
        }

        // PUT: api/Operations/PostConsignor
        [HttpPost,Route("PostConsignor")]
        public async Task<ActionResult<ConsigneeDTO>> PostConsignor(ConsigneeDTO consignerDto)
        {
            var consigner = new Consignor();
            try
            {
                consigner.InjectFrom(consignerDto);
                await _context.Consignor.AddAsync(consigner).ConfigureAwait(false);
                await _context.SaveChangesAsync().ConfigureAwait(false);
            }
            catch (Exception ex)
            {
                string path = Path.Combine(_hostEnvironment.ContentRootPath, "Log.txt");
                System.IO.File.AppendAllText(@path, Environment.NewLine + DateTime.Now.ToString() + ex.ToString() + Environment.NewLine + "Error occured in  PostConsignor method");
            }

            return CreatedAtAction("GetConsignor", new { id = consigner.ConsignorId }, consigner);
        }

        // PUT: api/Operations/PutConsignor/5
        [HttpPut,Route("PutConsignor/{id}")]
        public async Task<ActionResult<Consignor>> PutConsignor(int id, ConsignorDTO consignorDto)
        {
            try
            {
                if (id != consignorDto.ConsignorId)
                {
                    return NotFound();
                }

                var consignor = await _context.Consignor.FindAsync(id).ConfigureAwait(false);
                consignor.InjectFrom(consignorDto);

                _context.Entry(consignor).State = EntityState.Modified;
                await _context.SaveChangesAsync().ConfigureAwait(false);

            }
            catch (DbUpdateConcurrencyException ex)
            {
                if (!ConsignorExists(id))
                {
                    return NotFound();
                }
                else
                {
                    string path = Path.Combine(_hostEnvironment.ContentRootPath, "Log.txt");
                    System.IO.File.AppendAllText(@path, Environment.NewLine + DateTime.Now.ToString() + ex.ToString() + Environment.NewLine + "Error occured in  PutConsignor method");
                }
            }

            return NoContent();
        }

        // DELETE: api/Operations/DeleteConsignor/5

        [HttpDelete,Route("DeleteConsignor/{id}")]
        public async Task<ActionResult<Consignor>> DeleteConsignor(int id)
        {
            var consignor = await _context.Consignor.FindAsync(id).ConfigureAwait(false);
            if (consignor == null)
            {
                return NotFound();
            }

            _context.Consignor.Remove(consignor);
            await _context.SaveChangesAsync().ConfigureAwait(false);

            return consignor;
        }

        [NonAction]
        private bool ConsignorExists(int id)
        {
            return _context.Consignor.Any(e => e.ConsignorId == id);
        }

        //[HttpGet]
        [HttpGet, Route("GetConsignee")]
        public async Task<ActionResult<IEnumerable<ConsigneeDTO>>> GetConsignee()
        {
            var consigneeDto = new List<ConsigneeDTO>();
            try
            {
                var consignee = await _context.Consignee.ToListAsync().ConfigureAwait(false);
                consigneeDto = consignee.Select(x => new ConsigneeDTO().InjectFrom(x)).Cast<ConsigneeDTO>().ToList();
            }
            catch (Exception ex)
            {
                string path = Path.Combine(_hostEnvironment.ContentRootPath, "Log.txt");
                System.IO.File.AppendAllText(@path, Environment.NewLine + DateTime.Now.ToString() + ex.ToString() + Environment.NewLine + "Error occured in  GetConsignee method");
            }

            return consigneeDto;
        }

        [HttpGet, Route("GetConsignee/{id}")]
        public async Task<ActionResult<ConsigneeDTO>> GetConsignee(int id)
        {
            var consigneeDto = new ConsigneeDTO();
            try
            {
                var consignee = await _context.Consignee.FindAsync(id).ConfigureAwait(false);
                consigneeDto.InjectFrom(consignee);
            }
            catch (Exception ex)
            {
                var path = Path.Combine(_hostEnvironment.ContentRootPath, "Log.txt");
                System.IO.File.AppendAllText(@path, Environment.NewLine + DateTime.Now.ToString() + ex.ToString() + Environment.NewLine + "Error occured in  GetConsignee method");
            }
            return consigneeDto;
        }

        [HttpPost, Route("PostConsignee")]
        public async Task<ActionResult<ConsigneeDTO>> PostConsignee(ConsigneeDTO consigneeDto)
        {
            var consignee = new Consignee();
            try
            {
                consignee.InjectFrom(consigneeDto);
                await _context.Consignee.AddAsync(consignee).ConfigureAwait(false);
                await _context.SaveChangesAsync().ConfigureAwait(false);
            }
            catch (Exception ex)
            {
                var path = Path.Combine(_hostEnvironment.ContentRootPath, "Log.txt");
                System.IO.File.AppendAllText(@path, Environment.NewLine + DateTime.Now.ToString() + ex.ToString() + Environment.NewLine + "Error occured in  GetConsignee method");
            }
            return CreatedAtAction("GetConsignee", new { id = consignee.ConsigneeId }, consignee);
        }

        [HttpPut, Route("PutConsignee/{id}")]
        public async Task<ActionResult<ConsigneeDTO>> PutConsignee(int id, ConsigneeDTO consigneeDto)
        {
            try
            {
                if (id != consigneeDto.ConsigneeId)
                {
                    return NotFound();
                }

                var consignee = await _context.Consignee.FindAsync(id).ConfigureAwait(false);
                consignee.InjectFrom(consigneeDto);

                _context.Entry(consignee).State = EntityState.Modified;
                await _context.SaveChangesAsync().ConfigureAwait(false);
            }
            catch (DbUpdateConcurrencyException ex)
            {
                if (!ConsigneeExist(id))
                {
                    return NotFound();
                }
                else
                {
                    string path = Path.Combine(_hostEnvironment.ContentRootPath, "Log.txt");
                    System.IO.File.AppendAllText(@path, Environment.NewLine + DateTime.Now.ToString() + ex.ToString() + Environment.NewLine + "Error occured in  PutConsignor method");
                }
            }

            return NoContent();
        }

        [HttpDelete, Route("DeleteConsignee/{id}")]
        public async Task<ActionResult<Consignee>> DeleteConsignee(int id)
        {
            var consignee = await _context.Consignee.FindAsync(id).ConfigureAwait(false);
            if (consignee == null)
            {
                return NotFound();
            }

            _context.Consignee.Remove(consignee);
            await _context.SaveChangesAsync().ConfigureAwait(false);

            return consignee;

        }

        [NonAction]
        public bool ConsigneeExist(int id)
        {
            return _context.Consignee.Any(c => c.ConsigneeId == id);
        }
        #endregion


    }
}
