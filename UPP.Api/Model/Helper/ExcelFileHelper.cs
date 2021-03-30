
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Spreadsheet;
using System;
using System.Collections.Generic;
using System.Data;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using UPP.Model;

namespace UPP.Api.Model.Helper
{
    public abstract class ExcelFileHelper
    {
        public static void ProcessWorkSheet(Sheet sheet, ref List<EmployeeDTO> lstEmployeeDTO, WorkbookPart workbookPart, char[] cellReferenceColumn)
        {
            try
            {
                if (sheet == null)
                {
                    throw new ArgumentNullException($"The sheet you have providedis null parameter:  {sheet}");
                }
                if (lstEmployeeDTO.Count > 0 || lstEmployeeDTO == null)
                {
                    throw new ArgumentException($"The List you have provided is already populated: {lstEmployeeDTO}, please provide an empty instance list ");
                }
                if (cellReferenceColumn == null)
                {
                    throw new ArgumentNullException($"The sheet you have providedis null parameter:  {cellReferenceColumn}");
                }

                WorksheetPart wsPart = (WorksheetPart)(workbookPart.GetPartById(sheet.Id));

                IEnumerable<Cell> cells = wsPart.Worksheet.Descendants<Cell>().OrderBy(cellReference => cellReference.CellReference);
                var _firstColumnCells = cells.Where(cell => cell.CellReference.Value.ToString().Contains(cellReferenceColumn[0])).OrderBy(cell => cell.CellReference.Value);
                var checkValue = cells.Where(cell => cell.CellReference.Value.ToString().Contains(cellReferenceColumn[0])).OrderBy(cell => int.Parse(cell.CellReference.Value.Substring(1))).Count();

                int rowNumber = 0;
                int cellNumber = 0;

                foreach (var item in cellReferenceColumn)
                {
                    //append data tolist

                    var firstColumnCells = cells.Where(cell => cell.CellReference.Value.ToString().Contains(item)).OrderBy(cell => int.Parse(cell.CellReference.Value.Substring(1)));

                    //first iteration will be for the first column, then next
                    foreach (var cell in firstColumnCells)
                    {
                        string value = null;
                        if (cell.InnerText.Length > 0)
                        {
                            value = cell.InnerText;

                            // If the cell represents an integer number, you are done. 
                            // For dates, this code returns the serialized value that 
                            // represents the date. The code handles strings and 
                            // Booleans individually. For shared strings, the code 
                            // looks up the corresponding value in the shared string 
                            // table. For Booleans, the code converts the value into 
                            // the words TRUE or FALSE.
                            if (cell.DataType != null)
                            {
                                switch (cell.DataType.Value)
                                {
                                    case CellValues.SharedString:

                                        // For shared strings, look up the value in the
                                        // shared strings table.
                                        var stringTable =
                                            workbookPart.GetPartsOfType<SharedStringTablePart>()
                                            .FirstOrDefault();

                                        // If the shared string table is missing, something 
                                        // is wrong. Return the index that is in
                                        // the cell. Otherwise, look up the correct text in 
                                        // the table.
                                        if (stringTable != null)
                                        {
                                            value =
                                                stringTable.SharedStringTable
                                                .ElementAt(int.Parse(value, NumberFormatInfo.InvariantInfo)).InnerText;
                                        }
                                        break;

                                    case CellValues.Boolean:
                                        switch (value)
                                        {
                                            case "0":
                                                value = "FALSE";
                                                break;
                                            default:
                                                value = "TRUE";
                                                break;
                                        }
                                        break;
                                }
                            }
                            else
                            {
                                var novalue = "cell has no value skipping it";
                            }
                            //cell is number if not getting into switch
                        }

                        //we skip the firt row because it is headings, but we can check the headings to validate if they are in the correct order
                        if (rowNumber >= 1 && rowNumber <= checkValue)
                        {
                            if (rowNumber <= checkValue && cellNumber < 1)
                            {
                                lstEmployeeDTO.Add(new EmployeeDTO());
                            }

                            switch (cellNumber)
                            {
                                case 0:
                                    {
                                        lstEmployeeDTO[rowNumber - 1].IdentityNo = value;
                                        break;
                                    }
                                case 1:
                                    {
                                        lstEmployeeDTO[rowNumber - 1].Firstname = value;
                                        break;
                                    }
                                case 2:
                                    {
                                        lstEmployeeDTO[rowNumber - 1].Lastname = value;
                                        break;
                                    }
                                case 3:
                                    {
                                        lstEmployeeDTO[rowNumber - 1].Dob = DateTime.FromOADate(Convert.ToDouble(value, new CultureInfo("en-US", true)));
                                        break;
                                    }
                                case 4:
                                    {
                                        lstEmployeeDTO[rowNumber - 1].EquityId = Convert.ToInt32(value, NumberFormatInfo.InvariantInfo);
                                        break;
                                    }
                                case 5:
                                    {
                                        lstEmployeeDTO[rowNumber - 1].GenderId = Convert.ToInt32(value, NumberFormatInfo.InvariantInfo);
                                        break;
                                    }
                                case 6:
                                    {
                                        lstEmployeeDTO[rowNumber - 1].EmpDeptId = Convert.ToInt32(value, NumberFormatInfo.InvariantInfo);
                                        break;
                                    }
                                case 7:
                                    {
                                        lstEmployeeDTO[rowNumber - 1].Email = value;
                                        break;
                                    }
                                case 8:
                                    {
                                        lstEmployeeDTO[rowNumber - 1].Website = value;
                                        break;
                                    }
                                case 9:
                                    {
                                        lstEmployeeDTO[rowNumber - 1].Address = value;
                                        break;
                                    }
                                case 10:
                                    {
                                        lstEmployeeDTO[rowNumber - 1].Contact = value;
                                        break;
                                    }
                                case 11:
                                    {
                                        lstEmployeeDTO[rowNumber - 1].StartDate = DateTime.FromOADate(Convert.ToDouble(value, new CultureInfo("en-US", true)));
                                        break;
                                    }
                                case 12:
                                    {

                                        lstEmployeeDTO[rowNumber - 1].EndDate = DateTime.FromOADate(Convert.ToDouble(value, new CultureInfo("en-US", true)));
                                        break;
                                    }

                            }

                            rowNumber++;
                        }

                        var localrow = rowNumber;
                        if (rowNumber == 0)
                        {
                            rowNumber = 1;
                        }
                        if (rowNumber >= checkValue)
                        {
                            rowNumber = 0;
                        }
                    }

                    cellNumber++;
                }
            }
            catch (Exception ex)
            {

                throw;
            }
        }



    }
}
