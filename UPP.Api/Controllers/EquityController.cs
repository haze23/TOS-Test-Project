using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Omu.ValueInjecter;
using UPP.Api.Model.Helper;
using UPP.Model;

namespace UPP.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EquityController : ControllerBase
    {
        private readonly DbEntites _context;

        public EquityController(DbEntites context)
        {
            _context = context;
        }

        // GET:api/Equities
        [HttpGet]
        public async Task<ActionResult<IEnumerable<EquityDTO>>> GetEquity()
        {
            var gender = HttpContext.Session.Get<List<GenderDTO>>("key");

            var EquityDTO = await _context.Equities.Select(c => new EquityDTO
            {
                EquityId = c.EquityId,
                EquityCode = c.EquityCode,
                EquityDesc = c.EquityDesc
            }).ToListAsync().ConfigureAwait(false);
            return EquityDTO;
        }

        // GET: api/Equities/5
        [HttpGet("{id}")]
        public async Task<ActionResult<EquityDTO>> GetEquity(int id)
        {
            var equity = await _context.Equities.FindAsync(id).ConfigureAwait(false);
            var EquityDTO = new EquityDTO();
            EquityDTO.InjectFrom(equity);

            if (equity == null)
            {
                return NotFound();
            }

            return EquityDTO;
        }

        // PUT: api/Equities/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEquity(int id, Equity equity)
        {
            if (id != equity.EquityId)
            {
                return BadRequest();
            }

            _context.Entry(equity).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync().ConfigureAwait(false);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EquityExists(id))
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

        // POST: api/Equities
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<EquityDTO>> PostEquity(EquityDTO EquityDTO)
        {
            var equity = new Equity();
            equity.InjectFrom(EquityDTO);
            _context.Equities.Add(equity);
            await _context.SaveChangesAsync().ConfigureAwait(false);

            return CreatedAtAction("GetEquity", new { id = equity.EquityId }, equity);
        }

        // DELETE: api/Equities/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Equity>> DeleteEquity(int id)
        {
            var equity = await _context.Equities.FindAsync(id).ConfigureAwait(false);
            if (equity == null)
            {
                return NotFound();
            }

            _context.Equities.Remove(equity);
            await _context.SaveChangesAsync().ConfigureAwait(false);

            return equity;
        }

        private bool EquityExists(int id)
        {
            return _context.Equities.Any(e => e.EquityId == id);
        }
    }
}
