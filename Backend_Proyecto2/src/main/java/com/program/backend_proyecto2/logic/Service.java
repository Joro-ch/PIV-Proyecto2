package com.program.backend_proyecto2.logic;

import com.program.backend_proyecto2.data.CategoriaDao;
import com.program.backend_proyecto2.data.ClienteDao;
import com.program.backend_proyecto2.data.CoberturaDao;
import com.program.backend_proyecto2.data.CoberturasPolizasDao;
import com.program.backend_proyecto2.data.DataBase;
import com.program.backend_proyecto2.data.MarcaDao;
import com.program.backend_proyecto2.data.MetodoPagoDao;
import com.program.backend_proyecto2.data.UsuarioDao;
import com.program.backend_proyecto2.data.ModeloDao;
import com.program.backend_proyecto2.data.PolizaDao;
import com.program.backend_proyecto2.data.VehiculoDao;
import java.sql.ResultSet;
import java.util.List;

public class Service {
    private static Service uniqueInstance;
    
    public static Service instance(){
        if (uniqueInstance == null){
            uniqueInstance = new Service();
        }
        return uniqueInstance; 
    }
    
    DataBase Database;
    UsuarioDao usuarioDao;
    ClienteDao clienteDao;
    MetodoPagoDao mpDao;
    ModeloDao moDao;
    CategoriaDao caDao;
    CoberturaDao coDao;
    CoberturasPolizasDao cpDao;
    VehiculoDao veDao;
    PolizaDao poDao;
    MarcaDao marDao;
    private Service(){
        Database = new DataBase();
        usuarioDao = new UsuarioDao(Database);
        clienteDao = new ClienteDao(Database);
        mpDao = new MetodoPagoDao(Database);
        moDao = new ModeloDao(Database);
        caDao = new CategoriaDao(Database);
        coDao = new CoberturaDao(Database);
        veDao = new VehiculoDao(Database);
        cpDao = new CoberturasPolizasDao(Database);
        poDao = new PolizaDao(Database);
        marDao = new MarcaDao(Database);
    }

    public Usuario usuarioFind(String cedula) throws Exception{
        return usuarioDao.read(cedula);
    }
    
    public void usuarioAdd(Usuario usuario) throws Exception {
       usuarioDao.create(usuario);
    }

    public Cliente clienteFind(Usuario usuario) throws Exception{
        return clienteDao.read(usuario.getId());
    }
    
    public void clienteAdd(Cliente cliente) throws Exception {
       clienteDao.create(cliente);
    }

    public void clienteUpdate(Cliente cliente) throws Exception {
        usuarioDao.update(cliente.getUsuario());
        clienteDao.update(cliente);
        mpDao.update(cliente.getTarjeta());
    } 

    public void tarjetaAdd(MetodoPago mp) throws Exception {
        mpDao.create(mp);
    }
    
    public void tarjetaUpdate(MetodoPago mp) throws Exception {
        mpDao.update(mp);
    }
   
    
    public List<Cliente> getClientes() throws Exception{
        return clienteDao.clientes();
    }    
    public List<Modelo> getModelos() throws Exception {
        return moDao.modelos();
    }
    
    public List<String> getMarcas() throws Exception {
        return moDao.marcas();
    }
    
    public void ModeloAdd(Modelo modelo) throws Exception{
        moDao.create(modelo);
    }
    
    public Vehiculo vehiculoFind(String placa) throws Exception{
        return veDao.read(placa);
    }
    
    public Cobertura coberturaFrom(ResultSet rs,String alias) throws Exception{
        return coDao.from(rs, alias);
    }
    
    public boolean isCobertura(String descripcion) throws Exception {
        return coDao.estaCobertura(descripcion);
    } 
    
    public List<Cobertura> coberturasPoliza(String codigoP) throws Exception{
        return cpDao.coberturasPoliza(codigoP);
    }
    
    public List<Poliza> polizasCliente(String cliente) throws Exception{
        return poDao.polizas(cliente);
    }
    
    public List<Poliza> polizasPlaca(String cliente, String placa) throws Exception{
        return poDao.polizasPlaca(cliente,placa);
    }
    
    public void categoriaAdd(Categoria c) throws Exception {
        caDao.create(c);
    }
    
    public Categoria categoriaFind(String id) throws Exception {
        return caDao.read(id);
    }
    
    public List<Categoria> getCategorias() throws Exception {
        return caDao.categorias();
    }
    
    public boolean isCategoria(String descripcion) throws Exception {
        return caDao.estaCategoria(descripcion);
    }
    
    public void coberturaAdd(Cobertura c) throws Exception {
        coDao.create(c);
    }
    
    public Cobertura coberturaFind(String id) throws Exception {
        return coDao.read(id);
    }
    
    public List<Cobertura> getCoberturas() throws Exception {
        return coDao.coberturas();
    }
    
    public Modelo getModelo(String modelo,String anio) throws Exception{
        System.out.println("Entra al get modelo");
        return moDao.read(modelo,anio);
    }
    
    public void vehiculoAdd(Vehiculo v)throws Exception{
        System.out.println("Entra a create de service");
        System.out.println(v.getModelo().getModelo());
        System.out.println(v.getModelo().getAnio());
        veDao.create(v);
    }

    public void polizaAdd(Poliza poliza) throws Exception{
        poDao.create(poliza);
        for(Cobertura c: poliza.getCoberturas()){
            cpDao.create(c.getId(), poliza.getCodigo());
        }
    }
    public Poliza polizaFind(String codigo)throws Exception{
        return poDao.read(codigo);
    }
     public Vehiculo checkPlaca(String placa)throws Exception{
        System.out.println("Entra a checkPlaca de service");
        return veDao.read(placa);
    }
     
    public void marcaAdd(Marca m)throws Exception{
       marDao.create(m);
    }
}

